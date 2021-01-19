export default {
  data:() => ({

  }),
  methods: {
    inputFormatting(inputName) {
      this[inputName] = this[inputName].replace(/\d|\s/g, '');
      if(this[inputName]) {
        this[inputName] = this[inputName][0].toUpperCase() + this[inputName].slice(1);
      }
    },
    regExpTest(value, expression) {
      const regExp = new RegExp(expression);
      return regExp.test(value);
    },
    replaceCursor(e) {
      console.log(this.phone);
      if(this.phone[this.phone.length - 1] === ')') {
        this.$refs.phone.selectionEnd = this.phone.length - 1;
      }
    },
    removeSpace() {
      this.$refs.phone.selectionEnd = this.phone.length - 1;
    },
    regForPhone() {
      let result = this.phone.replace(/\D/g, '');
      let match = result.match(/(\+?7|8|9|\d|)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.noneFormattedPhone = match[0];
      let formatted = '';
      console.log(match);
      if(!match) {
        formatted = '+';
      } else {
        if(match[1]) {
          if(match[1] === '7') {
            formatted += '+' + match[1];
          // } else if (match[1] === '9') {
          //   formatted += '+7' + match[1];
          // } else if() {
          } else {
            formatted += '+7' + match[1];
          }
        }
        if(match[2] && match[2] !== '') {
          formatted += ` (${match[2]})`;
        }
        if(match[3]) {
          formatted += ` ${match[3]}`;
        }
        if(match[4]) {
          formatted += '-' + match[4];
        }
        if(match[5]) {
          formatted += '-' + match[5];
        }
      }
      console.log(formatted);
      this.phone = formatted;
    }
  },
}