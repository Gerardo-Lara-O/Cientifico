const Character = ()=> {
    const view = `
        <div class="Character-inner">
            <article class="Character-card">
                <img src="image" alt="name">
                <h2>Character</h2>
            </article>
            <article class="Characters-card">
                <h3>Episodes:</h3>
                <h3>Status:</h3>
                <h3>Species:</h3>
                <h3>Gender:</h3>
                <h3>Origin:</h3>
                <h3>Last location:</h3>
            </article>
        </div>
    `;
    return view;
}

export default Character;