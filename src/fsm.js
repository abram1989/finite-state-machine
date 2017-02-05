class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if(!config) {
        throw new Error();
      }
      this.config = config;
      this.states = config.states;
      this.state = config.initial;
      this.history = [];
      this.redoHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(!this.states[state]) {
        throw new Error();
      }
      this.history.push(this.state);
      this.redoHistory = [];
      this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var transitions = this.states[this.state].transitions;
      if(!transitions[event]) {
        throw new Error();
      }
      this.history.push(this.state);
      this.redoHistory = [];
      this.state = transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      return Object.keys(this.states).filter(state => !event || this.states[state].transitions[event]);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(!this.history.length) {
        return false;
      } else {
        this.redoHistory.push(this.state);
        this.state = this.history.pop();
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(!this.redoHistory.length) {
        return false;
      } else {
        this.history.push(this.state);
        this.state = this.redoHistory.pop();
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [];
      this.redoHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
