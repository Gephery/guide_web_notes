/**
 * Created by gephery on 12/30/16.
 */
var math = {
    /**
     * Finds the lowest common multiple of the two integers.
     * @param num1 One of the numbers can be lower of higher.
     * @param num2 One of the numbers can be lower or higher.
     * @returns {*} 0 if one of the numbers is zero and a natural number if both integers(non zero).
     */
    lcm: function (num1, num2) {
            if (!num1 || !num2) {
                return 0;
            }
            // Find which one is larger and which is smaller so computation is easier finding lcm
            var isOneLarger = num1 > num2;
            var lowerN = isOneLarger ? num2 : num1;
            var higherN = isOneLarger ? num1 : num2;

            var found = false;
            var lcm = higherN;

            while (!found) {
                if (lcm % lowerN == 0) {
                    found = true;
                    return lcm;
                } else {
                    lcm *= 2;
                }
            }
    },

    gcd: function (a, b) {
        if (b == 0 && b > a) {
            var aS = a;
            a = b;
            b = aS;
        }
        while (a != 0) {
            var aT = a;
            a %= b;
            b %= aT;
            console.log("a: " + a + ", b: " + b);
        }
        return b;
    }

};

module.exports = math;

