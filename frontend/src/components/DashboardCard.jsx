export default function DashboardCard({

    title,

    value

}) {

    return (

        <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-gray-500">

                {title}

            </h2>

            <h1 className="text-3xl font-bold mt-3">

                {value}

            </h1>

        </div>

    );

}