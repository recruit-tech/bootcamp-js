class Todo {
    #id
    #name
    #done

    constructor(id, name, done) {
      this.#id = id;
      this.#name = name;
      this.#done = done;
    }
  
    get id(){
        return this.#id
    }

    set id(value){
        this.#id = value
    }

    get name(){
        return this.#name
    }

    set name(value){
        this.#name = value
    }

    get done() {
        return this.#done
    }

    set done(value) {
        this.#done = value
    }
  }

  export default Todo;