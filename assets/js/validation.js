class Validation {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    // Method to check if input value is empty
    required() {
        return this.value.trim() === '' ? `${this.name} مطلوب` : false;
    }

    // Method to check if input is arabic
    isArabic() {
        // Regular expression to match Arabic characters
        var arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
        if (!arabicRegex.test(this.value)) {
            return `يجب ادخال ${this.name} باللغه العربية`;
        }
        return false;
    }

    noSpecialCharacters() {
        const specialCharRegex = /[^a-zA-Z0-9\u0600-\u06FF\s]/;
        if (specialCharRegex.test(this.value)) {
            return `لا يجب ان يحتوي ${this.name} على أحرف خاصة`;
        }
        return false;
    }

    // Method to check input value with specific pattern
    regex(pattern) {
        return new RegExp(pattern).test(this.value) ? '' : `هذا الحقل غير صالح`;
    }

    // Method to check if input is unique (this would require an asynchronous call in a real scenario)
    async unique(table, columnName, dbConnection) {
        const query = `SELECT * FROM ${table} WHERE ${columnName} = ?`;
        const result = await dbConnection.execute(query, [this.value]);
        return result.length === 0 ? '' : `This ${this.name} already exists`;
    }

    // Method to check if value is confirmed
    confirmed(valueConfirmation) {
        return this.value === valueConfirmation ? '' : `${this.name} not confirmed`;
    }

    // Method to check if input is string
    isString() {
        return isNaN(this.value) ? '' : 'Please enter a string value';
    }

    // Method to check age falls within specified range
    lengthAge(minAge, maxAge) {
        const currentDate = new Date();
        const birthDate = new Date(this.value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return (age >= minAge && age <= maxAge) ? '' : `${this.name} must be between ${minAge} and ${maxAge} years old`;
    }

    // Method to filter input
    filter() {
        let filteredValue = this.value.trim(); // Remove leading and trailing whitespace
        filteredValue = filteredValue.replace(/\\/g, ''); // Remove backslashes
        filteredValue = filteredValue.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
        filteredValue = filteredValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); // Convert special characters to HTML entities
        return filteredValue;
    }
}
