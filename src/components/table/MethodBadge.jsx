export default function MethodBadge({method}) {
        
        let bgcolor = "bg-slate-300"

        switch (method.toUpperCase()) {
            case "GET":
                bgcolor = "bg-green-300"
                break;
            case "PUT":
                bgcolor = "bg-yellow-300"
                break;
            case "DELETE":
                bgcolor = "bg-blue-300"
                break;
            case "POST":
                bgcolor = "bg-red-300"

        }

        
        return (
            <div className={`${bgcolor} pr-2 pl-2 rounded-xl lg:rounded-lg mr-1 h-5 dark:text-black inline-flex items-center`}>
                <p className="font-semibold">{method}</p>
            </div>
        )

}