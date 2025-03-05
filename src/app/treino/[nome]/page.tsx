'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface Exercicio {
  nome: string;
  repeticoes: string;
  gif: string;
}

interface TreinoDia {
  dia: string;
  exercicios: Exercicio[];
}

const mockTreinos: Record<string, TreinoDia[]> = {
  abc: [
    {
      dia: 'Segunda-feira',
      exercicios: [
        { nome: 'Supino horizontal na máquina', repeticoes: '3x12', gif: '/image/gifs/supino-reto_na-maquina.gif' },
        { nome: 'Desenvolvimento Halteres', repeticoes: '3x12', gif: '/image/gifs/desenvolvimento-para-ombros-com-halteres.webp' },
        { nome: 'Elevação lateral com halteres', repeticoes: '3x12', gif: '/image/gifs/ombros-elevacao-lateral-de-ombros-com-halteres.webp' },
        { nome: 'Tríceps pulley', repeticoes: '3x12', gif: '/image/gifs/triceps-puxada-no-pulley.webp' },
        { nome: 'Tríceps testa na polia', repeticoes: '3x12', gif: '/image/gifs/Triceps-testa-na-Polia.gif' },
        { nome: 'Supino inclinado na máquina', repeticoes: '3x12', gif: '/image/gifs/supino-inclinado-maquina.gif' },
      ],
    },
    {
      dia: 'Terça-feira',
      exercicios: [
        { nome: 'Puxada frontal aberta', repeticoes: '3x12', gif: '/image/gifs/Puxada-frente-pegada-aberta.gif' },
        { nome: 'Remada baixa', repeticoes: '3x12', gif: '/image/gifs/remada-baixa-triangulo.gif' },
        { nome: 'Pulldown fechado na polia', repeticoes: '3x12', gif: '/image/gifs/10471301-puxada-com-pegada-fechada-no-pulley.webp' },
        { nome: 'Rosca direta com halteres', repeticoes: '3x12', gif: '/image/gifs/dumbbell-biceps-curl.gif' },
        { nome: 'Rosca martelo na polia ou halteres', repeticoes: '3x12', gif: '/image/gifs/cable-hammer-curl-with-rope.gif' },
      ],
    },
    {
      dia: 'Quarta-feira',
      exercicios: [
        { nome: 'Leg press 45°', repeticoes: '3x12', gif: '/image/gifs/pernas-leg-press-45-tradicional.webp' },
        { nome: 'Agachamento no Smith', repeticoes: '3x12', gif: '/image/gifs/agachamento-smith.webp' },
        { nome: 'Cadeira flexora', repeticoes: '3x12', gif: '/image/gifs/caidera-flexora.gif' },
        { nome: 'Cadeira extensora', repeticoes: '3x12', gif: '/image/gifs/cadeira-extensora.gif' },
        { nome: 'Panturrilha no leg press ou em pé na máquina', repeticoes: '3x12', gif: '/image/gifs/Panturrilha-em-pe-no-aparelho.webp' },
        { nome: 'Abdominal na máquina ou polia', repeticoes: '3x12', gif: '/image/gifs/Abdominal-Supra-com-Corda-na-Polia-Alta.gif' },
      ],
    },
    {
      dia: 'Sexta-feira – Fullbody + aeróbico',
      exercicios: [
        { nome: 'Supino horizontal na máquina', repeticoes: '3x12', gif: '/image/gifs/supino-reto_na-maquina.gif' },
        { nome: 'Puxada frontal aberta', repeticoes: '3x12', gif: '/image/gifs/Puxada-frente-pegada-aberta.gif' },
        { nome: 'Remada baixa', repeticoes: '3x12', gif: '/image/gifs/remada-baixa-triangulo.gif' },
        { nome: 'Rosca direta com halteres', repeticoes: '3x12', gif: '/image/gifs/dumbbell-biceps-curl.gif' },
      ],
    },
    {
      dia: 'Sábado – Cardio + core',
      exercicios: [
        { nome: '30 min de aeróbico ', repeticoes: '3x12', gif: '/image/gifs/esteira.jpg' },
        { nome: 'Mobilidade e alongamento', repeticoes: '3x12', gif: '/image/gifs/puxada.gif' },
      ]
    }
  ],
};

export default function TreinoPage() {
  const params = useParams();
  const nome = Array.isArray(params.nome) ? params.nome[0] : params.nome;
  const treino = mockTreinos[nome ?? 'default'] || [];
  const [status, setStatus] = useState<Record<string, boolean>>({});

  const toggleExercicio = (diaIndex: number, exIndex: number) => {
    setStatus((prev) => ({
      ...prev,
      [`${diaIndex}-${exIndex}`]: !prev[`${diaIndex}-${exIndex}`],
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Treino: {nome?.toUpperCase()}</h1>
      {treino.map((dia: TreinoDia, diaIndex: number) => (
        <div key={diaIndex} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{dia.dia}</h2>
          {dia.exercicios.map((ex: Exercicio, exIndex: number) => (
            <Card
              key={exIndex}
              className={`mb-3 p-3 flex items-center gap-3 ${status[`${diaIndex}-${exIndex}`] ? 'bg-green-100' : ''}`}
            >
                <Image 
                    src={ex.gif}
                    alt={ex.nome}
                    width={50}
                    height={50}
                
                    className='w-16 h16 rounded'
                >

                </Image>
              <CardContent className="flex-1">
                <p className="font-semibold">{ex.nome}</p>
                <p className="text-sm text-gray-600">{ex.repeticoes}</p>
              </CardContent>
              <Button size="sm" onClick={() => toggleExercicio(diaIndex, exIndex)}>
                {status[`${diaIndex}-${exIndex}`] ? '✓' : 'Fazer'}
              </Button>
            </Card>
          ))}
        </div>
      ))}
      <Button className="w-full mt-4" onClick={() => alert('Treino concluído!')}>Concluir Treino</Button>
    </div>
  );
}
