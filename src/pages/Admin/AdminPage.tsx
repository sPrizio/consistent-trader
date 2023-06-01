import AdminMarketNews from "../../components/Admin/AdminMarketNews";

/**
 * The administrator dashboard page, shows controls for app management
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function AdminPage() {


    //  RENDER

    return (
        <div className="ct-admin-page">
            <div className="columns is-multiline is-mobile">
                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                    <AdminMarketNews />
                </div>
            </div>
        </div>
    )
}

export default AdminPage;