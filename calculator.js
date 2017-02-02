var str = "12/5*9+9.4*2".replace(/[^-()\d/*+.]/g, '');
var f = [];
Math.factorial = function (n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    if (f[n] > 0) {
        return f[n];
    }
    return f[n] = Math.factorial(n - 1) * n;
};
var Calculator = function () {
    var memory;

    var equation = '';

    this.value = function (value) {
        if (typeof value !== 'undefined') {
            equation += parseFloat(value);
        }
        return this;
    };

    this.clear = function () {
        equation = '';
        return this;
    };

    this.add = function (value) {
        if (typeof value !== 'undefined') {
            equation += parseFloat(value);
            equation += '+';
        }
        return this;
    };

    this.subtract = function (value) {
        if (typeof value !== 'undefined') {
            equation += parseFloat(value);
            equation += '-';
        }
        return this;
    };

    this.multiply = function (value) {
        if (typeof value !== 'undefined') {
            equation += parseFloat(value);
            equation += '*';
        }
        return this;
    };

    this.divide = function (value) {
        if (typeof value !== 'undefined') {
            if (value == 0) {
                throw "Division par zéro!!!";
            }
            equation += parseFloat(value);
            equation += '/';
        }
        return this;
    };

    this.sin = function (value) {
        equation += 'Math.sin(' + parseFloat(value) + ')';
        return this;
    };

    this.cos = function (value) {
        equation += 'Math.cos(' + parseFloat(value) + ')';
        return this;
    };

    this.tan = function (value) {
        equation += 'Math.tan(' + parseFloat(value) + ')';
        return this;
    };

    this.setMemory = function (memoryValue) {
        memory = memoryValue;
    };

    this.getMemory = function () {
        return memory;
    };

    this.factorial = function (value) {
        if (typeof value === 'undefined') {
            equation = 'Math.factorial(' + this.equals() + ')';
        } else {
            equation += 'Math.factorial(' + parseFloat(value) + ')';
        }
        return this;
    };

    this.equals = function () {
        var equationSolution = eval(equation);
        equation = '';
        return equationSolution;
    }
};

$(document).ready(function () {
    var calc = new Calculator();
    var number = 0;
    var result = "";
    var input = $(".input");
    var button = $(".keys span").not("#equals").not("#memA").not("#pos").not("#memE").not(".operator");

    input.text(0);

    $('.clear').click(function () {
        calc.clear();
        result = "";
        number = 0;
        input.text("0");
    });

    $("#memA").click(function () {
        calc.setMemory(input.text());
    });

    $("#memE").click(function () {
        input.text(calc.getMemory());
    });

    $('#equals').click(function () {
        if ($.isNumeric(number) === true) { calc.value(number); };
        result = calc.equals();
        number = result;
        input.text(result);
    });

    $(".operator").click(function () {
        if ($(this).text() === "+") {
            result += "+";
            calc.add(number);
        } else if ($(this).text() === "-") {
            result += "-";
            calc.subtract(number);
        } else if ($(this).text() === "x") {
            result += "x";
            calc.multiply(number);
        } else if ($(this).text() === "÷") {
            result += '÷';
            calc.divide(number);
        } else if ($(this).text() === "sin") {
            result = "sin(" + result + ")";
            calc.sin(number);
        } else if ($(this).text() === "cos") {
            result = "cos(" + result + ")";
            calc.cos(number);
        } else if ($(this).text() === "tan") {
            result = "tan(" + result + ")";
            calc.tan(number);
        } else if ($(this).text() === "!n") {
            result = "!" + result;
            calc.factorial(number);
        }
        number = "";
        input.text(result);
    });

    button.click(function () {
        var guiInput = ($(this).text());
        number += guiInput;
        result += guiInput;
        input.text(result);
    });

    $("#pos").click(function () {
        if (navigator.geolocation) {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(displayPosition, displayError,
                { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
        }
        else {
            alert("Geolocation is not supported by this browser");
        }

        function displayPosition(position) {
            var pos = $("#infoPos").text("Position -- > Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
        }
        function displayError(error) {
            var errors = {
                1: 'Permission denied',
                2: 'Position unavailable',
                3: 'Request timeout'
            };
            alert("Error: " + errors[error.code]);
        }
    });
});