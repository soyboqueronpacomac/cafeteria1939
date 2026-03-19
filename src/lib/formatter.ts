export const formatDate = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now.getTime() - past.getTime();
    
    // Si la fecha es inválida o en el futuro
    if (isNaN(past.getTime()) || diffInMs < 0) {
        return "Recién creado";
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `Creado hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInHours < 24) {
        return `Creado hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInDays < 30) {
        return `Creado hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    } else {
        return `Creado el ${past.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
}