document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projectsGrid');
    const searchInput = document.getElementById('searchInput');
    let projectsData = [];

    // Carica i dati dal file JSON aggiungendo un parametro unico (?v=...) per forzare l'aggiornamento
    fetch('projects.json?v=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            displayProjects(projectsData);
        })
        .catch(error => {
            console.error('Errore nel caricamento dei progetti:', error);
            grid.innerHTML = '<p class="no-results">Errore nel caricamento dei dati.</p>';
        });

    // Funzione per mostrare i progetti nella griglia
    function displayProjects(projects) {
        grid.innerHTML = ''; // Pulisce la griglia
        
        if (projects.length === 0) {
            grid.innerHTML = '<p class="no-results">Nessun progetto trovato con questa ricerca.</p>';
            return;
        }

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="${project.immagine}" alt="${project.nome}" class="card-img" onerror="this.src='https://via.placeholder.com/400x200?text=Immagine+non+trovata'">
                <div class="card-content">
                    <h2 class="card-title">${project.nome}</h2>
                    <p class="card-desc">${project.descrizione}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-btn">Visita il Sito <i class="fas fa-external-link-alt" style="margin-left: 5px;"></i></a>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // Funzionalità di ricerca in tempo reale
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredProjects = projectsData.filter(project => {
            return project.nome.toLowerCase().includes(searchTerm) || 
                   project.descrizione.toLowerCase().includes(searchTerm);
        });
        
        displayProjects(filteredProjects);
    });
});
