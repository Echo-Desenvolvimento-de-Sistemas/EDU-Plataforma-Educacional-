import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Check, Plus, Search, Loader2 } from 'lucide-react';
import axios from 'axios';

interface BnccSkill {
    id: number;
    code: string;
    description: string;
    component: string;
    grade_year: string;
}

interface BnccSelectorProps {
    selectedIds: number[];
    onChange: (ids: number[]) => void;
    gradeYear?: string;
    component?: string;
}

export function BnccSelector({ selectedIds, onChange, gradeYear: initialGrade, component: initialComponent }: BnccSelectorProps) {
    const [open, setOpen] = useState(false);
    const [skills, setSkills] = useState<BnccSkill[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters (initialized from props but mutable)
    const [search, setSearch] = useState('');
    const [gradeFilter, setGradeFilter] = useState('');
    const [componentFilter, setComponentFilter] = useState('');

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [localSelected, setLocalSelected] = useState<number[]>(selectedIds);

    // Sync external selection and props when modal opens
    useEffect(() => {
        if (open) {
            setLocalSelected(selectedIds);
            setGradeFilter(initialGrade || '');
            setComponentFilter(initialComponent || '');
            // Trigger initial fetch happens via the debounced effect below due to dependencies
        }
    }, [open, selectedIds, initialGrade, initialComponent]);

    const fetchSkills = useCallback(async (reset = false) => {
        if (!open) return;

        setLoading(true);
        const currentPage = reset ? 1 : page;

        try {
            const params: any = {
                page: currentPage,
                search: search,
            };

            if (componentFilter) params.component = componentFilter;
            if (gradeFilter) params.grade = gradeFilter;

            const response = await axios.get('/bncc/search', { params });
            const data = response.data;

            if (reset) {
                setSkills(data.data);
            } else {
                setSkills(prev => [...prev, ...data.data]);
            }

            setHasMore(!!data.next_page_url);
            if (!reset) setPage(currentPage + 1);
            else setPage(2);

        } catch (error) {
            console.error("Failed to fetch BNCC skills", error);
        } finally {
            setLoading(false);
        }
    }, [open, search, componentFilter, gradeFilter, page]);

    // Initial load and Search debounce (includes filters)
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                fetchSkills(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [open, search, componentFilter, gradeFilter]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchSkills(false);
        }
    };

    const toggleSkill = (id: number) => {
        setLocalSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        onChange(localSelected);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Plus className="mr-2 h-4 w-4" />
                    {selectedIds.length > 0 ? `${selectedIds.length} Habilidades selecionadas` : 'Selecionar Habilidades BNCC'}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Selecionar Habilidades BNCC</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3 pb-2 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por código (EF01...) ou descrição..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="Filtrar Componente (Ex: Matemática)"
                            className="bg-muted/30"
                            value={componentFilter}
                            onChange={(e) => setComponentFilter(e.target.value)}
                        />
                        <Input
                            placeholder="Filtrar Ano/Série (Ex: 1º, 2º, Médio)"
                            className="bg-muted/30"
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 p-2 overflow-y-auto min-h-0" id="bncc-list">
                    <div className="space-y-2">
                        {skills.map(skill => (
                            <div
                                key={skill.id}
                                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${localSelected.includes(skill.id)
                                    ? 'bg-primary/10 border-primary'
                                    : 'hover:bg-muted'
                                    }`}
                                onClick={() => toggleSkill(skill.id)}
                            >
                                <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${localSelected.includes(skill.id) ? 'bg-primary border-primary text-primary-foreground' : 'border-primary'
                                    }`}>
                                    {localSelected.includes(skill.id) && <Check className="h-3 w-3" />}
                                </div>
                                <div className="flex-1 text-sm">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <Badge variant="outline" className="font-mono">{skill.code}</Badge>
                                        <span className="text-xs text-muted-foreground font-medium text-slate-600">{skill.component} • {skill.grade_year}</span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">{skill.description}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="py-4 flex justify-center text-muted-foreground">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...
                            </div>
                        )}

                        {!loading && skills.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                Nenhuma habilidade encontrada com os filtros atuais.
                            </div>
                        )}

                        {!loading && hasMore && skills.length > 0 && (
                            <div className="pt-2 flex justify-center">
                                <Button variant="ghost" size="sm" onClick={loadMore}>Carregar Mais</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t mt-auto">
                    <div className="flex-1 flex items-center text-sm text-muted-foreground">
                        {localSelected.length} selecionadas
                    </div>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar Seleção</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
