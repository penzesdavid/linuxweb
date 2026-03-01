async function getdistros() {
    const response = await fetch('distros-suggestions.json');
    const data = await response.json();
    return data;
}

