export const convertirFecha = (cadena = '') => { 
    if(cadena === '' || !cadena) return '';
    const meses = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ]; 
    const fecha = new Date(cadena); 
    const dia = fecha.getDate(); 
    const mes = meses[fecha.getMonth()]; 
    const año = fecha.getFullYear(); 
    let hora = fecha.getHours(); 
    const minutos = fecha.getMinutes(); 
    const ampm = hora >= 12 ? 'pm' : 'am'; 
    hora = hora % 12; hora = hora ? hora : 12; // La hora '0' debe ser '12' 
    const strMinutos = minutos < 10 ? '0' + minutos : minutos; 
    return `${dia} ${mes} ${año}, ${hora}:${strMinutos} ${ampm}`;
}