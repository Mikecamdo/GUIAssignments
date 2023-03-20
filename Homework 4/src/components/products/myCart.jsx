import { CartContext } from "../../context/cartContext"
import { useContext } from "react"

export const MyCart = () => {
    const context = useContext(CartContext);

    if (!context.cart) {
        return <>
            Cart is empty
        </>;
    }

    return <>
        <div className="row justify-content-center">
        <div className="col-10">
        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th className="border-top">Qty</th>
                    <th className="border-top">Product</th>
                    <th className="border-top text-end">Total</th>
                </tr>
            </thead>
            <tbody>
        {
            context.cart.items.map((item, index) => {
                return (<tr key={index}>
                    <td>{item.quantity}</td>
                    <td>{item.product.name} <span className="text-muted">- ${item.product.price}/each</span></td>
                    <td className="text-end">${item.totalPrice}</td>
                </tr>)}
            )
        }
            </tbody>
            <tfoot>
                <tr>
                    <th className="border-bottom-0"></th> {/* Intentionally left empty */}
                    <th className="border-bottom-0"></th>
                    <th className="border-bottom-0 text-end">${context.cart.total}</th>
                </tr>
            </tfoot>
        </table>
        </div>
        </div>
    </>;
}