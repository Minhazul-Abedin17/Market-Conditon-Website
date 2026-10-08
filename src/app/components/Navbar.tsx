

interface NavItems{
    id : string,
    icon : string,
    nameBn : string
}

const Navbar =async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data = await res.json()
    const navs : NavItems[]= data
    console.log(navs)
    return (
        <div className='flex gap-5 items-center justify-center mt-3'>
            {
                navs.map((n,i) => <div key={i}>
                    <span>{n.icon}</span>
                    <span className="text-[13px] font-bold">{n.nameBn}</span>
                    </div>)
            }
        </div>
    );
};

export default Navbar;