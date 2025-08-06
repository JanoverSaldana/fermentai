// Mock service para el chat con Fermentia (sin server-side dependencies)
import type { Message } from "@/types";
import { getVineyards } from "@/lib/data";

// Respuestas predefinidas para simular la IA
const mockResponses = [
  "🍇 Según los datos de tus viñedos, todo parece estar en buen estado. Las condiciones climáticas son óptimas para esta época del año.",
  "🌡️ He revisado los sensores IoT y la temperatura del suelo está en niveles ideales. Te recomiendo mantener el riego actual.",
  "🐛 Detecté una alerta de plagas en uno de tus viñedos. Te sugiero inspeccionar las hojas de las plantas.",
  "📊 El resumen de tus viñedos muestra un crecimiento saludable. Las variedades están mostrando excelente desarrollo.",
  "💧 Los niveles de humedad están perfectos para esta temporada. El sistema de riego automático está funcionando correctamente.",
  "🍷 Basándome en los datos históricos, esta podría ser una excelente cosecha. Te recomiendo preparar el equipo de recolección.",
];

// Función para simular el chat con IA
export async function mockChatWithFermentia(
  history: Message[], 
  message: string
): Promise<{ text: string }> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Analizar el mensaje para dar respuestas más contextuales
  const lowerMessage = message.toLowerCase();
  let response = "";
  
  if (lowerMessage.includes('plaga') || lowerMessage.includes('pest')) {
    const vineyards = getVineyards();
    const vineyardWithPests = vineyards.find(v => v.iotData.pests);
    if (vineyardWithPests) {
      response = `🐛 ¡Alerta! He detectado actividad de plagas en ${vineyardWithPests.name}. Te recomiendo inspeccionar inmediatamente la zona y considerar aplicar tratamiento orgánico preventivo.`;
    } else {
      response = "✅ No se han detectado alertas de plagas en ninguno de tus viñedos actualmente. Todos los sensores indican condiciones normales.";
    }
  } else if (lowerMessage.includes('resumen') || lowerMessage.includes('estado')) {
    const vineyards = getVineyards();
    const totalPlots = vineyards.reduce((sum, v) => sum + v.totalPlots, 0);
    const vineyardsWithPests = vineyards.filter(v => v.iotData.pests).length;
    response = `📊 **Resumen de tus viñedos:**\n\n• Total de viñedos: ${vineyards.length}\n• Parcelas totales: ${totalPlots}\n• Viñedos con alertas: ${vineyardsWithPests}\n\nTodos los sistemas IoT están funcionando correctamente.`;
  } else if (lowerMessage.includes('riego') || lowerMessage.includes('agua')) {
    response = "💧 El sistema de riego está funcionando óptimamente. La humedad del suelo se mantiene en niveles ideales (65-75%). Te recomiendo mantener el programa actual de riego.";
  } else if (lowerMessage.includes('temperatura') || lowerMessage.includes('clima')) {
    response = "🌡️ Las condiciones climáticas son excelentes: temperatura promedio de 22°C durante el día y 15°C durante la noche. Perfectas para el desarrollo de las uvas.";
  } else {
    // Respuesta aleatoria para otros casos
    response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }
  
  return { text: response };
}

// Función mock para agregar viñedos (sin server action)
export async function mockAddVineyard(vineyardData: any): Promise<{ success: boolean; message: string }> {
  // Simular validación y guardado
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validaciones básicas
  if (!vineyardData.name || vineyardData.name.length < 3) {
    return { 
      success: false, 
      message: 'El nombre debe tener al menos 3 caracteres.' 
    };
  }
  
  if (!vineyardData.location || vineyardData.location.length < 3) {
    return { 
      success: false, 
      message: 'La ubicación debe tener al menos 3 caracteres.' 
    };
  }
  
  if (!vineyardData.totalPlots || vineyardData.totalPlots <= 0) {
    return { 
      success: false, 
      message: 'El número de parcelas debe ser positivo.' 
    };
  }
  
  // Simular éxito
  console.log('Nuevo viñedo agregado (mock):', vineyardData);
  
  return { 
    success: true, 
    message: 'Viñedo agregado exitosamente (demo)' 
  };
}
