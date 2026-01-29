<?php

namespace Database\Seeders;

use App\Models\BnccSkill;
use Illuminate\Database\Seeder;

class BnccSeeder extends Seeder
{
    public function run()
    {
        $skills = [
            // --- EDUCAÇÃO INFANTIL (EI) ---
            ['code' => 'EI01CG01', 'component' => 'Educação Infantil', 'grade_year' => 0, 'description' => 'Movimentar as partes do corpo para exprimir corporalmente emoções, necessidades e desejos.'],
            ['code' => 'EI02EO01', 'component' => 'Educação Infantil', 'grade_year' => 0, 'description' => 'Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos.'],
            ['code' => 'EI03TS01', 'component' => 'Educação Infantil', 'grade_year' => 0, 'description' => 'Utilizar sons produzidos por materiais, objetos e instrumentos musicais durante brincadeiras de faz de conta, encenações, criações musicais e festas.'],
            ['code' => 'EI03ET01', 'component' => 'Educação Infantil', 'grade_year' => 0, 'description' => 'Estabelecer relações de comparação entre objetos, observando suas propriedades.'],

            // --- LÍNGUA PORTUGUESA (LP) - ANOS INICIAIS (EF1) ---
            // 1º Ano
            ['code' => 'EF01LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 1, 'description' => 'Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.'],
            ['code' => 'EF01LP02', 'component' => 'Língua Portuguesa', 'grade_year' => 1, 'description' => 'Escrever, espontaneamente ou por ditado, palavras e frases de forma alfabética – usando letras/grafemas que representem fonemas.'],
            ['code' => 'EF01LP05', 'component' => 'Língua Portuguesa', 'grade_year' => 1, 'description' => 'Reconhecer o sistema de escrita alfabética como representação dos sons da fala.'],
            // 2º Ano
            ['code' => 'EF02LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 2, 'description' => 'Utilizar, ao produzir o texto, grafia correta de palavras conhecidas ou com estruturas silábicas alternadas.'],
            ['code' => 'EF02LP04', 'component' => 'Língua Portuguesa', 'grade_year' => 2, 'description' => 'Ler e escrever corretamente palavras com sílabas CV, V, CVC, CCV.'],
            // 3º Ano
            ['code' => 'EF03LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 3, 'description' => 'Ler e escrever palavras com correspondências regulares contextuais entre grafemas e fonemas.'],
            ['code' => 'EF03LP05', 'component' => 'Língua Portuguesa', 'grade_year' => 3, 'description' => 'Identificar o número de sílabas de palavras, classificando-as em monossílabas, dissílabas, trissílabas e polissílabas.'],
            // 4º Ano
            ['code' => 'EF04LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 4, 'description' => 'Grafar palavras utilizando regras de correspondência fonema-grafema regulares diretas e contextuais.'],
            // 5º Ano
            ['code' => 'EF05LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 5, 'description' => 'Grafar palavras utilizando regras de correspondência fonema-grafema regulares, contextuais e morfológicas.'],
            // 6º ao 9º Ano
            ['code' => 'EF06LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 6, 'description' => 'Reconhecer a impossibilidade de uma neutralidade absoluta no relato de fatos e identificar diferentes graus de parcialidade.'],
            ['code' => 'EF69LP01', 'component' => 'Língua Portuguesa', 'grade_year' => 6, 'description' => 'Diferenciar liberdade de expressão de discursos de ódio, posicionando-se contrariamente a esse tipo de discurso.'],

            // --- MATEMÁTICA (MA) ---
            // 1º Ano
            ['code' => 'EF01MA01', 'component' => 'Matemática', 'grade_year' => 1, 'description' => 'Utilizar números naturais como indicador de quantidade ou de ordem em diferentes situações cotidianas.'],
            ['code' => 'EF01MA02', 'component' => 'Matemática', 'grade_year' => 1, 'description' => 'Contar de maneira exata ou aproximada, utilizando diferentes estratégias como o pareamento e outros agrupamentos.'],
            ['code' => 'EF01MA04', 'component' => 'Matemática', 'grade_year' => 1, 'description' => 'Contar a quantidade de objetos de coleções até 100 unidades.'],
            // 2º Ano
            ['code' => 'EF02MA01', 'component' => 'Matemática', 'grade_year' => 2, 'description' => 'Comparar e ordenar números naturais (até a ordem de centenas) pela compreensão de características do sistema de numeração.'],
            ['code' => 'EF02MA06', 'component' => 'Matemática', 'grade_year' => 2, 'description' => 'Resolver e elaborar problemas de adição e de subtração, envolvendo números de até três ordens.'],
            // 3º Ano
            ['code' => 'EF03MA01', 'component' => 'Matemática', 'grade_year' => 3, 'description' => 'Ler, escrever e comparar números naturais de até a ordem de unidade de milhar.'],
            ['code' => 'EF03MA07', 'component' => 'Matemática', 'grade_year' => 3, 'description' => 'Resolver e elaborar problemas de multiplicação (por 2, 3, 4, 5 e 10).'],
            // 4º Ano
            ['code' => 'EF04MA03', 'component' => 'Matemática', 'grade_year' => 4, 'description' => 'Resolver e elaborar problemas com números naturais envolvendo adição e subtração.'],
            // 5º Ano
            ['code' => 'EF05MA01', 'component' => 'Matemática', 'grade_year' => 5, 'description' => 'Ler, escrever e ordenar números naturais até a ordem das centenas de milhar com compreensão das principais características do sistema de numeração decimal.'],
            // 6º Ano
            ['code' => 'EF06MA01', 'component' => 'Matemática', 'grade_year' => 6, 'description' => 'Comparar, ordenar, ler e escrever números naturais e números racionais.'],
            // 7º Ano
            ['code' => 'EF07MA01', 'component' => 'Matemática', 'grade_year' => 7, 'description' => 'Resolver e elaborar problemas com números inteiros.'],
            // 8º Ano
            ['code' => 'EF08MA01', 'component' => 'Matemática', 'grade_year' => 8, 'description' => 'Efetuar cálculos com potências de expoentes inteiros.'],
            // 9º Ano
            ['code' => 'EF09MA01', 'component' => 'Matemática', 'grade_year' => 9, 'description' => 'Reconhecer e empregar unidades usadas para expressar medidas muito grandes ou muito pequenas.'],

            // --- CIÊNCIAS (CI) ---
            ['code' => 'EF01CI01', 'component' => 'Ciências', 'grade_year' => 1, 'description' => 'Comparar características de diferentes materiais presentes em objetos de uso cotidiano.'],
            ['code' => 'EF02CI01', 'component' => 'Ciências', 'grade_year' => 2, 'description' => 'Identificar de que materiais são feitos os objetos que fazem parte da vida cotidiana.'],
            ['code' => 'EF03CI01', 'component' => 'Ciências', 'grade_year' => 3, 'description' => 'Produzir diferentes sons a partir da vibração de variados objetos.'],
            ['code' => 'EF04CI01', 'component' => 'Ciências', 'grade_year' => 4, 'description' => 'Identificar misturas na vida diária, com base em suas propriedades físicas observáveis.'],
            ['code' => 'EF05CI01', 'component' => 'Ciências', 'grade_year' => 5, 'description' => 'Explorar fenômenos que evidenciem propriedades físicas dos materiais.'],
            ['code' => 'EF06CI01', 'component' => 'Ciências', 'grade_year' => 6, 'description' => 'Classificar como homogênea ou heterogênea a mistura de dois ou mais materiais.'],
            ['code' => 'EF07CI01', 'component' => 'Ciências', 'grade_year' => 7, 'description' => 'Discutir a aplicação das máquinas simples.'],
            ['code' => 'EF08CI01', 'component' => 'Ciências', 'grade_year' => 8, 'description' => 'Identificar e classificar diferentes fontes de energia renováveis e não renováveis.'],
            ['code' => 'EF09CI01', 'component' => 'Ciências', 'grade_year' => 9, 'description' => 'Investigar as mudanças de estado físico da matéria.'],

            // --- GEOGRAFIA (GE) ---
            ['code' => 'EF01GE01', 'component' => 'Geografia', 'grade_year' => 1, 'description' => 'Descrever características observadas de seus lugares de vivência (moradia, escola, etc).'],
            ['code' => 'EF02GE01', 'component' => 'Geografia', 'grade_year' => 2, 'description' => 'Descrever a história das migrações no bairro ou comunidade em que vive.'],
            ['code' => 'EF03GE01', 'component' => 'Geografia', 'grade_year' => 3, 'description' => 'Identificar e comparar aspectos culturais dos grupos sociais de seus lugares de vivência.'],
            ['code' => 'EF04GE01', 'component' => 'Geografia', 'grade_year' => 4, 'description' => 'Selecionar, em seus lugares de vivência e em suas histórias familiares, componentes de paisagens.'],
            ['code' => 'EF05GE01', 'component' => 'Geografia', 'grade_year' => 5, 'description' => 'Descrever e analisar dinâmicas populacionais na Unidade da Federação em que vive.'],
            ['code' => 'EF06GE01', 'component' => 'Geografia', 'grade_year' => 6, 'description' => 'Comparar modificações das paisagens nos lugares de vivência.'],

            // --- HISTÓRIA (HI) ---
            ['code' => 'EF01HI01', 'component' => 'História', 'grade_year' => 1, 'description' => 'Identificar aspectos do seu crescimento por meio do registro das lembranças particulares.'],
            ['code' => 'EF02HI01', 'component' => 'História', 'grade_year' => 2, 'description' => 'Reconhecer espaços de sociabilidade e identificar os motivos que aproximam e separam as pessoas.'],
            ['code' => 'EF03HI01', 'component' => 'História', 'grade_year' => 3, 'description' => 'Identificar os grupos populacionais que formam a cidade e o município.'],
            ['code' => 'EF04HI01', 'component' => 'História', 'grade_year' => 4, 'description' => 'Reconhecer a história como resultado da ação do ser humano no tempo e no espaço.'],
            ['code' => 'EF05HI01', 'component' => 'História', 'grade_year' => 5, 'description' => 'Identificar os processos de formação das culturas e dos povos.'],
            ['code' => 'EF06HI01', 'component' => 'História', 'grade_year' => 6, 'description' => 'Identificar diferentes formas de compreensão da noção de tempo.'],

            // --- ARTES (AR) ---
            ['code' => 'EF15AR01', 'component' => 'Artes', 'grade_year' => 1, 'description' => 'Identificar e apreciar formas distintas das artes visuais tradicionais e contemporâneas.'],
            ['code' => 'EF15AR04', 'component' => 'Artes', 'grade_year' => 3, 'description' => 'Experimentar diferentes formas de expressão artística.'],
            ['code' => 'EF69AR01', 'component' => 'Artes', 'grade_year' => 6, 'description' => 'Pesquisar, apreciar e analisar formas distintas das artes visuais.'],

            // --- EDUCAÇÃO FÍSICA (EF) ---
            ['code' => 'EF12EF01', 'component' => 'Educação Física', 'grade_year' => 1, 'description' => 'Experimentar, fruir e recriar diferentes brincadeiras e jogos.'],
            ['code' => 'EF35EF01', 'component' => 'Educação Física', 'grade_year' => 3, 'description' => 'Experimentar e fruir brincadeiras e jogos populares do Brasil e do mundo.'],
            ['code' => 'EF67EF01', 'component' => 'Educação Física', 'grade_year' => 6, 'description' => 'Experimentar e fruir, na escola e fora dela, jogos eletrônicos diversos.'],

            // --- LÍNGUA INGLESA (LI) ---
            ['code' => 'EF06LI01', 'component' => 'Língua Inglesa', 'grade_year' => 6, 'description' => 'Interagir em situações de intercâmbio oral, demonstrando iniciativa para utilizar a língua inglesa.'],
            ['code' => 'EF07LI01', 'component' => 'Língua Inglesa', 'grade_year' => 7, 'description' => 'Interagir em situações de intercâmbio oral para realizar as atividades em sala de aula.'],
            ['code' => 'EF08LI01', 'component' => 'Língua Inglesa', 'grade_year' => 8, 'description' => 'Fazer uso da língua inglesa para resolver mal-entendidos.'],
            ['code' => 'EF09LI01', 'component' => 'Língua Inglesa', 'grade_year' => 9, 'description' => 'Fazer uso da língua inglesa para expor pontos de vista, argumentos e contra-argumentos.'],
        ];

        foreach ($skills as $skill) {
            BnccSkill::firstOrCreate(['code' => $skill['code']], $skill);
        }
    }
}
