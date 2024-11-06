export function formatDateBR(date: string, apenasData=false) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');    
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear(); 

    const hours = String(d.getHours()).padStart(2, '0');   
    const minutes = String(d.getMinutes()).padStart(2, '0'); 

    if (apenasData) {
        return `${day}/${month}/${year}`;
    }


    return `${day}/${month}/${year} ${hours}:${minutes}`;
}