var Checkout = /** @class */ (function () {
    function Checkout(pricingRules) {
        this.basket = {};
        this.pricingRules = pricingRules;
    }
    Checkout.prototype.addItem = function (sku) {
        if (!this.basket[sku]) {
            this.basket[sku] = 0;
        }
        this.basket[sku]++;
        this.updateDisplay();
    };
    Checkout.prototype.getTotal = function () {
        var total = 0;
        for (var _i = 0, _a = Object.entries(this.basket); _i < _a.length; _i++) {
            var _b = _a[_i], sku = _b[0], quantity = _b[1];
            var rule = this.pricingRules[sku];
            if (rule.discountQuantity && rule.discountPrice) {
                var discountedSets = Math.floor(quantity / rule.discountQuantity);
                var remainingItems = quantity % rule.discountQuantity;
                total += discountedSets * rule.discountPrice + remainingItems * rule.unitPrice;
            }
            else {
                total += quantity * rule.unitPrice;
            }
        }
        return total;
    };
    Checkout.prototype.updateDisplay = function () {
        var basketItems = document.getElementById("basketItems");
        var totalPrice = document.getElementById("totalPrice");
        basketItems.innerHTML = Object.entries(this.basket)
            .map(function (_a) {
            var sku = _a[0], quantity = _a[1];
            return "<li>".concat(sku, " x ").concat(quantity, "</li>");
        })
            .join("");
        totalPrice.textContent = this.getTotal().toString();
    };
    return Checkout;
}());
var pricingRules = {
    "A": { unitPrice: 50, discountQuantity: 3, discountPrice: 130 },
    "B": { unitPrice: 30, discountQuantity: 2, discountPrice: 45 },
    "C": { unitPrice: 20 },
    "D": { unitPrice: 15 }
};
var checkout = new Checkout(pricingRules);
function addItem() {
    var itemInput = document.getElementById("item");
    var item = itemInput.value.toUpperCase();
    checkout.addItem(item);
    itemInput.value = "";
}
