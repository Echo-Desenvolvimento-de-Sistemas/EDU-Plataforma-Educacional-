import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatDate, cn } from '@/lib/utils';
import { User, FileText, Users, MapPin, Heart, ShieldAlert, HeartPulse } from 'lucide-react';

interface StudentRegistrationCardProps {
    student: any;
}

function DetailItem({ 
    label, 
    value, 
    highlight = false, 
    className = "" 
}: { 
    label: string; 
    value: string | React.ReactNode; 
    highlight?: boolean; 
    className?: string 
}) {
    return (
        <div className={cn(
            "space-y-1 px-3.5 py-2.5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100/60 dark:border-slate-800/60 transition-all hover:bg-white dark:hover:bg-slate-900/60 hover:shadow-xs print:border-none print:bg-transparent print:p-0 print:m-0 print:shadow-none",
            className
        )}>
            <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block print:inline print:font-bold print:text-[10px] print:mr-1">{label}:</span>
            <span className={cn(
                "text-xs font-semibold text-slate-700 dark:text-slate-200 block truncate print:inline print:text-black print:font-normal",
                highlight && "text-emerald-650 dark:text-emerald-400 font-extrabold"
            )}>
                {value || '-'}
            </span>
        </div>
    );
}

export default function StudentRegistrationCard({ student }: StudentRegistrationCardProps) {
    if (!student) return null;

    return (
        <div className="space-y-6 print:space-y-2 text-sm print:text-xs">
            {/* 1. Dados Pessoais */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <User className="h-4 w-4 text-emerald-500 print:hidden" />
                    Dados Pessoais
                </h3>

                <div className="flex gap-6">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-2 print:gap-y-0.5 print:gap-x-4">
                        <DetailItem label="Nome" value={student.name} className="sm:col-span-2 uppercase font-extrabold text-slate-800 dark:text-slate-100" />
                        <DetailItem label="Nome Social" value={student.social_name} className="uppercase" />
                        <DetailItem label="Data Nasc." value={formatDate(student.birth_date)} />
                        <DetailItem label="Sexo" value={student.sex} />
                        <DetailItem label="Cor/Raça" value={student.color_race} />
                        <DetailItem label="Naturalidade" value={`${student.place_of_birth || '-'} - ${student.state_of_birth || '-'}`} className="sm:col-span-2" />
                        <DetailItem label="Nacionalidade" value={student.nationality || 'Brasileira'} />
                        <DetailItem label="Escola Origem" value={student.origin_school} className="sm:col-span-3 uppercase" />
                    </div>

                    {/* 3x4 Photo Placeholder */}
                    <div className="hidden print:flex flex-col items-center justify-center w-20 h-28 border border-black shrink-0">
                        <span className="text-[8px] text-center font-bold">FOTO 3x4</span>
                    </div>
                </div>
            </section>

            {/* 2. Documentação */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <FileText className="h-4 w-4 text-emerald-500 print:hidden" />
                    Documentação
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-3 print:gap-y-0.5 print:gap-x-4">
                    <DetailItem label="CPF" value={student.cpf} />
                    <DetailItem label="RG" value={student.rg} />
                    <DetailItem label="Órgão/UF" value={student.rg_issuer ? `${student.rg_issuer}/${student.rg_state || ''}` : undefined} />
                    <DetailItem label="Emissão" value={formatDate(student.rg_date)} />
                    <DetailItem label="NIS" value={student.nis} />
                    <DetailItem label="Cert. Nasc." value={
                        student.birth_cert_number ? `Matrícula: ${student.birth_cert_number}${student.birth_cert_model ? ` (${student.birth_cert_model})` : ''}` : undefined
                    } className="sm:col-span-2" />
                </div>
            </section>

            {/* 3. Filiação e Responsáveis */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <Users className="h-4 w-4 text-emerald-500 print:hidden" />
                    Filiação e Responsáveis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 print:grid-cols-2 print:gap-y-0.5 print:gap-x-4 print:mb-2">
                    <DetailItem label="Mãe" value={student.mother_name} className="uppercase" />
                    <DetailItem label="Pai" value={student.father_name} className="uppercase" />
                    <DetailItem label="Estado Civil dos Pais" value={student.parents_marital_status} />
                </div>

                <div className="space-y-3">
                    <Label className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider block print:text-black print:text-xs print:font-bold">Responsáveis Vinculados</Label>
                    {student.guardians && student.guardians.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
                            {student.guardians.map((guardian: any) => (
                                <div key={guardian.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 shadow-xs print:border-gray-300 print:p-2 print:bg-transparent">
                                    <div className="font-bold text-slate-800 dark:text-slate-100 print:text-black flex items-center justify-between gap-2">
                                        <span>{guardian.name}</span>
                                        <Badge variant="outline" className="text-[10px] py-0 px-2 font-bold text-emerald-650 bg-emerald-50/50 border-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50 print:border-gray-400 print:text-black">
                                            {guardian.pivot.kinship}
                                        </Badge>
                                    </div>
                                    <div className="text-xs font-medium text-slate-550 dark:text-slate-400 mt-2 space-y-1 font-mono print:text-black">
                                        <p>CPF: {guardian.cpf}</p>
                                        <p>WhatsApp: {guardian.phone}</p>
                                        {guardian.email && <p className="truncate">E-mail: {guardian.email}</p>}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-3 print:mt-1">
                                        {guardian.pivot.is_financial_responsible && (
                                            <Badge variant="outline" className="text-[9px] font-bold border-amber-200 text-amber-700 bg-amber-50/30 dark:border-amber-900/40 dark:text-amber-400 dark:bg-amber-950/10 print:border-gray-400 print:text-black">
                                                Financeiro
                                            </Badge>
                                        )}
                                        {guardian.pivot.is_pedagogic_responsible && (
                                            <Badge variant="outline" className="text-[9px] font-bold border-indigo-200 text-indigo-700 bg-indigo-50/30 dark:border-indigo-900/40 dark:text-indigo-400 dark:bg-indigo-950/10 print:border-gray-400 print:text-black">
                                                Pedagógico
                                            </Badge>
                                        )}
                                        {guardian.pivot.resides_with && (
                                            <Badge variant="outline" className="text-[9px] font-bold border-slate-200 text-slate-650 bg-slate-50/50 dark:border-slate-850 dark:text-slate-400 print:border-gray-400 print:text-black">
                                                Mora Junto
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-2 border border-dashed rounded-2xl text-center">Nenhum responsável cadastrado.</div>
                    )}
                </div>
            </section>

            {/* 4. Endereço */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <MapPin className="h-4 w-4 text-emerald-500 print:hidden" />
                    Endereço
                </h3>
                {student.address ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-2 print:gap-y-0.5 print:gap-x-4">
                        <DetailItem label="Rua / Logradouro" value={student.address.street} className="sm:col-span-2" />
                        <DetailItem label="Número" value={student.address.number} />
                        <DetailItem label="Complemento" value={student.address.complement} />
                        <DetailItem label="Bairro" value={student.address.neighborhood} />
                        <DetailItem label="CEP" value={student.address.cep} />
                        <DetailItem label="Cidade" value={`${student.address.city || '-'} - ${student.address.state || '-'}`} />
                        <DetailItem label="Zona" value={student.address.zone} />
                        <DetailItem label="Contato de Referência" value={student.address.phone_contact} />
                    </div>
                ) : (
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-4 border border-dashed rounded-2xl text-center">Endereço não informado.</div>
                )}
            </section>

            {/* 5. Saúde */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <Heart className="h-4 w-4 text-emerald-500 print:hidden" />
                    Informações Médicas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-2 print:gap-y-0.5 print:gap-x-4">
                    <DetailItem label="Condições" value={student.health?.conditions} className="sm:col-span-2" />
                    <DetailItem label="Tipo Sanguíneo" value={student.health?.blood_type} highlight />
                    <DetailItem label="Medicamentos" value={student.health?.medications} className="sm:col-span-2" />
                    <DetailItem label="Alergias" value={student.health?.allergies} className="sm:col-span-2" />
                    <DetailItem label="Restrições Alimentares" value={student.health?.food_restrictions} className="sm:col-span-2" />
                    <DetailItem label="Vacinação" value={
                        <span className={cn("font-bold", student.health?.vaccination_updated ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400")}>
                            {student.health?.vaccination_updated ? 'Em dia' : 'Pendente/Não informada'}
                        </span>
                    } />
                    <DetailItem label="Deficiência / PNE" value={
                        student.health?.has_disability ? `Sim - ${student.health?.disability_details || ''}` : 'Não declarada'
                    } className="sm:col-span-3" />
                </div>
            </section>

            {/* 6. Transporte e Segurança */}
            <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                    <ShieldAlert className="h-4 w-4 text-emerald-500 print:hidden" />
                    Transporte e Segurança
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-2 print:gap-y-0.5 print:gap-x-4">
                    <DetailItem label="Meio de Transporte" value={student.transport_info} />
                    <DetailItem label="Autorização de Saída" value={student.exit_authorization ? 'Sim - Autorizado a sair desacompanhado' : 'Não - Apenas acompanhado pelos responsáveis'} />
                    {student.authorized_pickups && student.authorized_pickups.length > 0 && (
                        <DetailItem label="Outras Pessoas Autorizadas" value={Array.isArray(student.authorized_pickups) ? student.authorized_pickups.join(', ') : student.authorized_pickups} className="sm:col-span-2" />
                    )}
                </div>
            </section>

            {/* 7. Observações */}
            {student.observations && (
                <section className="bg-white dark:bg-slate-900/20 p-5 rounded-3xl border border-slate-100/80 dark:border-slate-800/80 shadow-xs print:p-0 print:border-none print:shadow-none print:bg-transparent print:break-inside-avoid">
                    <h3 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2 mb-4 print:text-black print:bg-gray-100 print:p-1 print:border print:border-gray-200 print:mb-2 print:text-xs">
                        <FileText className="h-4 w-4 text-emerald-500 print:hidden" />
                        Observações da Secretaria / Direção
                    </h3>
                    <div className="p-4 rounded-2xl bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/20 text-xs font-semibold text-slate-650 dark:text-slate-350 leading-relaxed print:bg-transparent print:p-0 print:border-none print:text-black">
                        {student.observations}
                    </div>
                </section>
            )}
        </div>
    );
}
