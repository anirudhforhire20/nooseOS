class simulator extends frame {
    constructor()
    {
        super('Simulator');
        const I = this;
        var b = document.createElement('embed');
        b.style.width = '100%';
        b.style.height = '100%';
        b.src = '../gravity_simulator/index.html';
        I.appendtoBody(b);
    }
}