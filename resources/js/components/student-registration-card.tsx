import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

interface StudentRegistrationCardProps {
    student: any; // Type this properly if possible, or use 'any' for now to match strictness level
}

export default function StudentRegistrationCard({ student }: StudentRegistrationCardProps) {
    if (!student) return null;

    return (
        <div className="space-y-8 print:space-y-2 text-sm print:text-xs">
            {/* 1. Dados Pessoais */}
            <section className="print:break-inside-avoid relative">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Dados Pessoais
                </h3>

                <div className="flex gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 print:grid-cols-2 gap-y-2 print:gap-y-0.5 gap-x-4">
                        {/* Row 1 */}
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                            <span className="font-bold mr-2 print:w-20">Nome:</span>
                            <span className="uppercase">{student.name}</span>
                        </div>
                        {student.social_name && (
                            <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                                <span className="font-bold mr-2 print:w-20">Nome Social:</span>
                                <span className="uppercase">{student.social_name}</span>
                            </div>
                        )}

                        {/* Row 2 */}
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                            <span className="font-bold mr-2 print:w-20">Data Nasc.:</span>
                            <span>{formatDate(student.birth_date)}</span>
                        </div>
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                            <span className="font-bold mr-2 print:w-20">Sexo:</span>
                            <span>{student.sex || 'Não informado'}</span>
                        </div>

                        {/* Row 3 */}
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                            <span className="font-bold mr-2 print:w-20">Naturalidade:</span>
                            <span>{student.place_of_birth} - {student.state_of_birth}</span>
                        </div>

                        {/* Row 4 */}
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                            <span className="font-bold mr-2 print:w-20">Cor/Raça:</span>
                            <span>{student.color_race || '-'}</span>
                        </div>
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                            <span className="font-bold mr-2 print:w-20">Nacionalidade:</span>
                            <span>{student.nationality || 'Brasileira'}</span>
                        </div>
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                            <span className="font-bold mr-2 print:w-20">Escola Origem:</span>
                            <span className="uppercase">{student.origin_school || 'Não informada'}</span>
                        </div>
                    </div>

                    {/* 3x4 Photo Placeholder */}
                    <div className="hidden print:flex flex-col items-center justify-center w-24 h-32 border border-black shrink-0">
                        <span className="text-[10px] text-center">FOTO 3x4</span>
                    </div>
                </div>
            </section>

            <Separator className="print:hidden" />

            {/* 2. Documentação */}
            <section className="print:break-inside-avoid">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Documentação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-4 print:gap-2 text-xs">
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                        <span className="font-bold mr-2 print:w-16">CPF:</span>
                        <span>{student.cpf}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                        <span className="font-bold mr-2 print:w-16">RG:</span>
                        <span>{student.rg || '-'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                        <span className="font-bold mr-2 print:w-16">Órgão/UF:</span>
                        <span>{student.rg_issuer}/{student.rg_state}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                        <span className="font-bold mr-2 print:w-16">Emissão:</span>
                        <span>{formatDate(student.rg_date)}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                        <span className="font-bold mr-2 print:w-16">NIS:</span>
                        <span>{student.nis || '-'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                        <span className="font-bold mr-2 print:w-20">Cert. Nasc.:</span>
                        <span>
                            {student.birth_cert_number ? `Matrícula: ${student.birth_cert_number}` : ''}
                            {student.birth_cert_model ? ` (${student.birth_cert_model})` : ''}
                            {!student.birth_cert_number && !student.birth_cert_model && '-'}
                        </span>
                    </div>
                </div>
            </section>

            <Separator className="print:hidden" />

            {/* 3. Filiação e Responsáveis */}
            <section className="print:break-inside-avoid">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:border-b print:border-black print:pb-1">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Filiação e Responsáveis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label className="text-xs text-gray-500">Mãe</Label>
                        <div className="text-gray-900 dark:text-gray-100 print:text-black">{student.mother_name || '-'}</div>
                    </div>
                    <div>
                        <Label className="text-xs text-gray-500">Pai</Label>
                        <div className="text-gray-900 dark:text-gray-100 print:text-black">{student.father_name || '-'}</div>
                    </div>
                    <div>
                        <Label className="text-xs text-gray-500">Estado Civil dos Pais</Label>
                        <div className="text-gray-900 dark:text-gray-100 print:text-black">{student.parents_marital_status || '-'}</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 print:text-black">Responsáveis Cadastrados</Label>
                    {student.guardians && student.guardians.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-3">
                            {student.guardians.map((guardian: any) => (
                                <div key={guardian.id} className="p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm print:border-gray-300">
                                    <div className="font-medium text-blue-900 dark:text-blue-300 print:text-black">{guardian.name}</div>
                                    <div className="text-sm text-gray-700 font-mono mt-1">
                                        CPF: {guardian.cpf} | Tel: {guardian.phone}
                                        {guardian.email && ` | Email: ${guardian.email}`}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2">{guardian.pivot.kinship}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {guardian.pivot.is_financial_responsible && <Badge variant="outline" className="text-xs print:border-gray-400 print:text-black">Financeiro</Badge>}
                                        {guardian.pivot.is_pedagogic_responsible && <Badge variant="outline" className="text-xs print:border-gray-400 print:text-black">Pedagógico</Badge>}
                                        {guardian.pivot.resides_with && <Badge variant="outline" className="text-xs print:border-gray-400 print:text-black">Mora Junto</Badge>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">Nenhum responsável cadastrado.</div>
                    )}
                </div>
            </section>

            <Separator className="print:hidden" />

            {/* 4. Endereço */}
            <section className="print:break-inside-avoid">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Endereço
                </h3>
                {student.address ? (
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-24">Endereço:</span>
                        <span>
                            {student.address.street}, {student.address.number}
                            {student.address.complement && ` - ${student.address.complement}`}
                            {student.address.neighborhood && ` - Bairro: ${student.address.neighborhood}`}
                            {student.address.city && ` - ${student.address.city}`}
                            {student.address.state && `/${student.address.state}`}
                            {student.address.cep && ` - CEP: ${student.address.cep}`}
                            {student.address.phone_contact && ` - Tel: ${student.address.phone_contact}`}
                            {student.address.zone && ` - Zona: ${student.address.zone}`}
                        </span>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">Endereço não informado.</div>
                )}
            </section>

            <Separator className="print:hidden" />

            {/* 5. Saúde */}
            <section className="print:break-inside-avoid">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Informações Médicas
                </h3>
                <div className="grid grid-cols-1 gap-2">
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Condições:</span>
                        <span>{student.health?.conditions || 'Nenhuma registrada'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Medicamentos:</span>
                        <span>{student.health?.medications || 'Nenhum registrado'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Alergias:</span>
                        <span>{student.health?.allergies || 'Nenhuma registrada'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Tipo Sanguíneo:</span>
                        <span>{student.health?.blood_type || '-'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Restrições Alim.:</span>
                        <span>{student.health?.food_restrictions || 'Nenhuma'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Vacinação:</span>
                        <span className={student.health?.vaccination_updated ? "text-green-600 font-bold" : "text-red-600"}>
                            {student.health?.vaccination_updated ? 'Em dia' : 'Pendente/Não informada'}
                        </span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-32">Deficiência:</span>
                        <span>
                            {student.health?.has_disability ?
                                `Sim - ${student.health?.disability_details || student.health?.conditions}` :
                                'Não declarada'}
                        </span>
                    </div>
                </div>
            </section>

            <Separator className="print:hidden" />

            {/* 6. Transporte e Autorizações */}
            <section className="print:break-inside-avoid">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                    <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                    Transporte e Segurança
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4">
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-24">Transporte:</span>
                        <span>{student.transport_info || 'Não informado'}</span>
                    </div>
                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                        <span className="font-bold mr-2 print:w-24">Aut. Saída:</span>
                        <span>{student.exit_authorization ? 'Sim - Autorizado(a) ir sozinho(a)' : 'Não - Apenas com responsáveis'}</span>
                    </div>
                    {student.authorized_pickups && student.authorized_pickups.length > 0 && (
                        <div className="col-span-2 print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                            <span className="font-bold mr-2 print:w-32">Pessoas Autorizadas:</span>
                            <span>{Array.isArray(student.authorized_pickups) ? student.authorized_pickups.join(', ') : student.authorized_pickups}</span>
                        </div>
                    )}
                </div>
            </section>

            <Separator className="print:hidden" />

            {/* 7. Observações */}
            {student.observations && (
                <>
                    <Separator className="print:hidden" />
                    <section className="print:break-inside-avoid">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                            <span className="w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-full print:hidden"></span>
                            Informações Adicionais
                        </h3>
                        <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-1">
                            <span className="font-bold mr-2 print:w-32">Observações:</span>
                            <span>{student.observations}</span>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
