
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockAddVineyard } from '@/services/chatService';

export default function NewVineyardPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const vineyardData = {
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      grapeVarietals: formData.get('grapeVarietals') as string,
      totalPlots: parseInt(formData.get('totalPlots') as string),
      imageUrl: formData.get('imageUrl') as string,
      imageHint: formData.get('imageHint') as string,
    };

    try {
      const result = await mockAddVineyard(vineyardData);
      
      if (result.success) {
        // Simular éxito y redirigir
        alert('Viñedo agregado exitosamente (demo)');
        router.push('/vineyards');
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'Error al guardar el viñedo' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid max-w-6xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
                 <Link href="/vineyards">
                    <Button {...{ variant: "outline", size: "icon" }} className="h-7 w-7">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Atrás</span>
                    </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Añadir Nuevo Viñedo
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                     <Link href="/vineyards">
                        <Button {...{ variant: "outline" }}>Cancelar</Button>
                    </Link>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : 'Guardar Viñedo'}
                    </Button>
                </div>
            </div>
            
            {errors.general && (
              <div className="bg-destructive/15 border border-destructive/50 text-destructive px-4 py-3 rounded">
                {errors.general}
              </div>
            )}
            
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Viñedo</CardTitle>
                            <CardDescription>
                                Introduce la información principal de tu nuevo viñedo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full"
                                        placeholder="Ej: Finca Roble Alto"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="location">Ubicación</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="Ej: Valle de Napa, California"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="grapeVarietals">Variedades de Uva</Label>
                                    <Input
                                        id="grapeVarietals"
                                        name="grapeVarietals"
                                        placeholder="Ej: Cabernet Sauvignon, Merlot"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="totalPlots">Total de Parcelas</Label>
                                    <Input
                                        id="totalPlots"
                                        name="totalPlots"
                                        type="number"
                                        placeholder="Ej: 12"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Imagen del Viñedo</CardTitle>
                            <CardDescription>
                                Añade una imagen representativa para tu viñedo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                <Label htmlFor="imageUrl">URL de la Imagen</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://placehold.co/400x300.png"
                                    defaultValue="https://placehold.co/400x300.png"
                                    required
                                />
                            </div>
                            <div className="grid gap-3 mt-4">
                                <Label htmlFor="imageHint">Pista para IA (Opcional)</Label>
                                <Input
                                    id="imageHint"
                                    name="imageHint"
                                    placeholder="Ej: vineyard sunset"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                 <Link href="/vineyards">
                    <Button {...{ variant: "outline" }}>Cancelar</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : 'Guardar Viñedo'}
                </Button>
            </div>
        </div>
      </form>
    </main>
  );
}
