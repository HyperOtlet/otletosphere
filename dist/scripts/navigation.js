

/**
 * ================================================================================================
 * navigation.js ==================================================================================
 * ================================================================================================
 * Display and coordinate three website sections : graph, board & about menu
 */


MicroModal.init();
document.querySelector('#about-btn').addEventListener('click', () => {
    MicroModal.show('modal-about');
})

var navigation = {
    links: document.querySelectorAll('[data-section]'),
    activLink: function(section) {

        if (movement.currentSection !== undefined) {
            // désactiver la surbrillance du lien vers la précédante section
            document.querySelector('[data-section="' + movement.currentSection + '"]')
                .classList.remove('active');
        }

        // activer la surbrillance du lien vers la nouvelle section
        document.querySelector('[data-section="' + section + '"]')
            .classList.add('active');
    }
}

navigation.links.forEach(link => {
    link.addEventListener('click', (e) => {
        movement.goTo(e.target.dataset.section);
    })
});

const headerHeight = 140;

var movement = {
    currentSection: undefined,
    offset: {
        graph: 0,
        board: window.innerHeight + headerHeight
    },
    goTo: function(section) {

        navigation.activLink(section);
        this.currentSection = section;

        switch (section) {
            case 'reseau':
                this.scroll(this.offset.graph);

                fiche.fixer(true);
                fiche.canClose(true);
                break;
                
            case 'fiches':
                this.scroll(this.offset.board);

                fiche.fixer(true);
                fiche.canClose(false);
                fiche.open();
                break;
        }
    },
    scroll: function(offset) {
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}

movement.goTo('reseau');

window.onresize = function() {
    movement.goTo(movement.currentSection);
}