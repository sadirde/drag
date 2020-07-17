class Drag {
    constructor(element) {
        this.element = element;
        this._initialPosition = {};
        this._currentPosition = {};
        this._offset = { x: 0, y: 0 };
        this._draggable = false;
        // workaround for 'this' issue in event listeners
        this._bind2this = {};
        this._bind2this.dragStart = this._dragStart.bind(this);
        this._bind2this.dragEnd = this._dragEnd.bind(this);
        this._bind2this.drag = this._drag.bind(this);
    }

    start() {
        this._setEventListeners("add");
    }

    stop() {
        this._setEventListeners("remove");
    }

    _setEventListeners(type) {
        const eventListener = type + "EventListener";

        this.element[eventListener]("mousedown", this._bind2this.dragStart, false);
        this.element[eventListener]("mouseup", this._bind2this.dragEnd, false);
        document[eventListener]("mousemove", this._bind2this.drag, false);

        this.element[eventListener]("touchstart", this._bind2this.dragStart, false);
        this.element[eventListener]("touchend", this._bind2this.dragEnd, false);
        document[eventListener]("touchmove", this._bind2this.drag, false);
    }

    _dragStart(evt) {
        evt.preventDefault();

        const target = evt.target;
        evt = evt.type === "touchstart" ? evt.touches[0] : evt;
        this._initialPosition.x = evt.clientX - this._offset.x;
        this._initialPosition.y = evt.clientY - this._offset.y;
        this._draggable = true;
    }

    _dragEnd() {
        this._initialPosition.x = this._currentPosition.x;
        this._initialPosition.y = this._currentPosition.y;
        this._draggable = false;
    }

    _drag(evt) {
        evt.preventDefault();
        
        if (this._draggable) {
            evt = evt.type === "touchmove" ? evt.touches[0] : evt;
            this._currentPosition.x = evt.clientX - this._initialPosition.x;
            this._currentPosition.y = evt.clientY - this._initialPosition.y;
            this._offset.x = this._currentPosition.x;
            this._offset.y = this._currentPosition.y;
            this.element.style.transform = `translate(${this._currentPosition.x}px, ${this._currentPosition.y}px)`;
        }
    }
}