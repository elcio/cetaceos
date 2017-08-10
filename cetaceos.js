(function(){

    let animais=[
        'baleia_azul',
        'baleia_cinzenta',
        'baleia_franca_austral',
        'baleia_minke',
        'baleia_piloto',
        'beluga',
        'boto_cor-de-rosa',
        'cachalote',
        'golfinho_comum',
        'golfinho_de_irrawaddy',
        'golfinho_do_crepúsculo',
        'golfinho-liso-do-sul',
        'golfinho_rotador',
        'jubarte',
        'narval',
        'orca'
    ];
    let sorteado;
    let correto;
    let _fase=0;
    let links=document.querySelectorAll('.btns a');
    let _placar=0;
    if(localStorage.placar){
        _placar=parseFloat(localStorage.placar);
    }
    Object.defineProperty(window,'placar',{
        set(v){
            _placar=v;
            document.querySelector('#score').innerHTML=v;
            if(v<15){
                fase=0;
            }else{
                fase=Math.floor(v/15);
            }
            localStorage.placar=v;
        },
        get(){return _placar;}
    });

    Object.defineProperty(window,'fase',{
        set(v){
            _fase=v;
            document.querySelector('#fase').innerHTML=v+1;
        },
        get(){return _fase;}
    });
    function nome(animal){
        return animal.replace(/_/g,' ');
    }

    function sorteia(){
        animais.sort(function(a,b){return Math.random()-0.5;})
        return animais.slice(0,5);
    }

    function sufixo(){
        if(fase==0)return '0.jpg';
        if(fase==1)return '1.jpg';
        if(fase==2)return Math.floor(Math.random()*2)+'.jpg';
        if(fase==3)return '2.jpg';
        if(fase==4)return Math.floor(Math.random()*2+1)+'.jpg';
        return Math.floor(Math.random()*3)+'.jpg';
    }

    function popula(){
        sorteado=sorteia();
        correto=sorteado[Math.floor(Math.random()*sorteado.length)];
        document.querySelector('.guessimg img').src='img/'+correto+sufixo();
        for(let i=0;i<links.length;i++){
            links[i].innerHTML=nome(sorteado[i]);
            links[i].setAttribute('data-animal',sorteado[i]);
            links[i].className="";
        }
    }

    popula();
    placar=placar;

    for(let i=0;i<links.length;i++){
        links[i].addEventListener('click',function(ev){
            let animal=ev.target.getAttribute('data-animal');
            if(animal==correto){
                ev.target.className="certo";
                placar++;
            }else{
                ev.target.className="errado";
                placar-=fase+1;
            }
            console.log(placar);
            setTimeout(popula,1000);
            ev.preventDefault();
        });
    }

})();
