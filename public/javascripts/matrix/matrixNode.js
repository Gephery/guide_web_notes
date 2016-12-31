/**
 * @author Gephery
 * @description A matrix node for use in a matrix module, use the provided functions to do operations.
 * Zeros are represented as 0/1, a zero may never be in this node's denominator.
 */

var math = require('../util/math.js');

var MatrixNode = function(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;


};

MatrixNode.prototype.setNumerator = function(intNum) { this.numerator = intNum; };

MatrixNode.prototype.setDenominator = function(naturalNam) {
    this.denominator = naturalNam > 0 ? naturalNam : 1;
};

MatrixNode.prototype.isInteger = function() { return this.numerator % this.denominator == 0; };

MatrixNode.prototype.getNumerator = function() { return this.numerator; };

MatrixNode.prototype.getDenominator = function() { return this.denominator; };

MatrixNode.prototype.add = function(node) {
    node = toNode(node);
    balanceDenominators(node, this);

    this.numerator += node.numerator;
    scale(gcd(this.numerator, this.numerator), true);
};

/**
 * Subtracts the given node from the local one.
 * @param node
 */
MatrixNode.prototype.subtract = function(node) {
    node = toNode(node);
    balanceDenominators(node, this);

    this.numerator -= node.numerator;
    scale(gcd(this.numerator, this.numerator), true);
};

/**
 * Multiplies the matrix node by the given node/integer. Note that this is different from scaling.
 * @param node The node/integer that the matrix node will be multiplied by.
 */
MatrixNode.prototype.multiply = function(node) {
    node = toNode(node);

    this.numerator *= node.numerator;
    this.denominator *= node.denominator;
};

/**
 * Use this to quickly duplicate the matrix node.
 * @returns {MatrixNode} A copy of the matrix node in reference.
 */
MatrixNode.prototype.duplicate = function() {
    return new MatrixNode(this.numerator, this.denominator);
};

/**
 *
 * @param multiplier
 * @param isDivision
 */
function scale(multiplier, isDivision) {
    if (isDivision) {
        this.numerator /= multiplier;
        this.denominator /= multiplier;
    } else {
        this.numerator *= multiplier;
        this.denominator *= multiplier;
    }
}

/**
 * Makes the two matrix nodes have the same denominator.
 * @param node1 Node number one, must be a matrix node.
 * @param node2 Node number two, must be a matrix node.
 */
function balanceDenominators(node1, node2) {
    var lcm = math.lcm(node1.denominator, node2.denominator); // Get lcm of denominators
    scale(lcm / node1.denominator, false);
    scale(lcm / node2.denominator, false);
}

/**
 * Turns integers into a MatrixNode far use with matrix node. Only use with integers and Matrix
 * nodes. Note that if passed a matrix node it will not return the original but a copy.
 * @param node Can be a MatrixNode or an integer.
 * @returns {*} A Matrix node.
 */
function toNode(node) {
    if (!(node instanceof MatrixNode) && node instanceof Number) {
        node = new MatrixNode(node, 1);
    } else {
        node = node.duplicate();
    }
    return node;
}
