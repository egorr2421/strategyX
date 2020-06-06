class unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        this.name = name;
        this.id = id;
        this.active = active;
        this.player = player;
        this.heal = heal;
        this.atcAcc = true;
    }
    moveTo(mas,Px,Py,x,y){
        if ((((Math.abs(Py - y)) + (Math.abs(Px - x)) <= this.move))) {
        this.move -=(Math.abs(Py - y)) + (Math.abs(Px - x));
        this.move == 0 ? this.active = false : this.active = true;
        mas[y][x] = mas[Py][Px];
        mas[Py][Px] = 0;
        }
            return false;
    }
    activeUnit(){
        this.active = true;
    }
}

class dwarf extends unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        super(name, id, active = true, heal = 100, player = "player1");
        this.move = 2;
        this.attack = 10;
    }
    activeUnit(){
        this.atcAcc = true;
        this.active = true;
        this.move=2
    }
    attackUnit(unt) {
        if (unt.player != this.player) {
            this.move--;
            this.move == 0 ? this.active = false : this.active = true;
            this.atcAcc = false;
            if (unt.id == 1){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 2){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 3){
                unt.heal -= this.attack * 4;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 4){
                unt.heal -= this.attack * 4;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 5){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }

        }
    }
}

class hourse extends unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        super(name, id, active = true, heal = 100, player = "player1");
        this.move = 4;
        this.attack = 18;
    }
    activeUnit(){
        this.atcAcc = true;
        this.active = true;
        this.move=4;
    }
    attackUnit(unt) {
        if (unt.player != this.player) {
            this.move--;
            this.move == 0 ? this.active = false : this.active = true;
            this.atcAcc = false;
            if (unt.id == 1){
                unt.heal -= this.attack * 4;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 2){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 3){
                unt.heal -= this.attack * 6;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 4){
                unt.heal -= this.attack ;
                this.heal -= unt.attack * 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 5){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
        }
    }
}

class pocket extends unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        super(name, id, active = true, heal = 100, player = "player1");
        this.move = 2;
        this.attack = 8;
    }
    activeUnit(){
        this.atcAcc = true;
        this.active = true;
        this.move=2;
    }
    attackUnit(unt) {
        if (unt.player != this.player) {
            this.move--;
            this.move == 0 ? this.active = false : this.active = true;
            this.atcAcc = false;
            if (unt.id == 1){
                unt.heal -= this.attack * 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 2){
                unt.heal -= this.attack * 3;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 3){
                unt.heal -= this.attack * 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 4){
                unt.heal -= this.attack * 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 5){
                unt.heal -= this.attack * 2;
                console.log(unt);
                console.log(this);
            }
        }
    }
}

class energy extends unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        super(name, id, active = true, heal = 100, player = "player1");
        this.move = 2;
        this.attack = 10;
    }
    activeUnit(){
        this.atcAcc = true;
        this.active = true;
        this.move=2
    }
    attackUnit(unt) {
        if (unt.player != this.player) {
            this.move--;
            this.move == 0 ? this.active = false : this.active = true;
            this.atcAcc = false;
            if (unt.id == 1){
                unt.heal -= this.attack ;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 2){
                unt.heal -= this.attack * 4;
                this.heal -= unt.attack ;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 3){
                unt.heal -= this.attack * 4;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 4){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 5){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
        }
    }
}

class king extends unit {
    constructor(name, id, active = true, heal = 100, player = "player1") {
        super(name, id, active = true, heal = 100, player = "player1");
        this.move = 1;
        this.attack = 4;
    }
    activeUnit(){
        this.atcAcc = true;
        this.active = true;
        this.move=1;
    }
    attackUnit(unt) {
        if (unt.player != this.player) {
            this.move--;
            this.move == 0 ? this.active = false : this.active = true;
            this.atcAcc = false;
            if (unt.id == 1){
                unt.heal -= this.attack *2;
                this.heal -= unt.attack /2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 2){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 3){
                unt.heal -= this.attack * 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 4){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
            if (unt.id == 5){
                unt.heal -= this.attack * 2;
                this.heal -= unt.attack / 2;
                console.log(unt);
                console.log(this);
            }
        }
    }
}