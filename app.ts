type PricingRule = {
    unitPrice: number;
    discountQuantity?: number;
    discountPrice?: number;
};

class Checkout {
    private basket: { [sku: string]: number } = {};
    private pricingRules: { [sku: string]: PricingRule };

    constructor(pricingRules: { [sku: string]: PricingRule }) {
        this.pricingRules = pricingRules;
    }

    addItem(sku: string): void {
        if (!this.basket[sku]) {
            this.basket[sku] = 0;
        }
        this.basket[sku]++;
        this.updateDisplay();
    }

    getTotal(): number {
        let total = 0;
        for (const [sku, quantity] of Object.entries(this.basket)) {
            const rule = this.pricingRules[sku];
            if (rule.discountQuantity && rule.discountPrice) {
                const discountedSets = Math.floor(quantity / rule.discountQuantity);
                const remainingItems = quantity % rule.discountQuantity;
                total += discountedSets * rule.discountPrice + remainingItems * rule.unitPrice;
            } else {
                total += quantity * rule.unitPrice;
            }
        }
        return total;
    }

    private updateDisplay() {
        const basketItems = document.getElementById("basketItems");
        const totalPrice = document.getElementById("totalPrice");
        
        basketItems.innerHTML = Object.entries(this.basket)
            .map(([sku, quantity]) => `<li>${sku} x ${quantity}</li>`)
            .join("");
        
        totalPrice.textContent = this.getTotal().toString();
    }

}

const pricingRules = {
    "A": { unitPrice: 50, discountQuantity: 3, discountPrice: 130 },
    "B": { unitPrice: 30, discountQuantity: 2, discountPrice: 45 },
    "C": { unitPrice: 20 },
    "D": { unitPrice: 15 }
};

const checkout = new Checkout(pricingRules);

function addItem() {
    const itemInput = document.getElementById("item") as HTMLInputElement;
    const item = itemInput.value.toUpperCase();
    checkout.addItem(item);
    itemInput.value = "";
}