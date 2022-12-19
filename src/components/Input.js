class Input {
    $input;
    constructor({ type, placeholder }) {
        this.$input = document.createElement("input");
        this.$input.className = `form-control form-control-lg mb-4`;
        this.$input.type = type || `text`;
        this.$input.placeholder = placeholder;
        this.$input.style = `border-radius: 2rem;`;

    }
    success() {
        this.$input.style.border = "1px solid green";
    }
    fail() {
        this.$input.style.border = "1px solid red";
    }
    getInputValue = () => {
        return this.$input.value;
    };
    setInputValue = (value) => {
        this.$input.value = value;
    };
    render() {
        return this.$input;
    }
}
export default Input;