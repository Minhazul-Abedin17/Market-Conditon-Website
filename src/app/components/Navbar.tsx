
'use client';

import { useEffect, useState } from 'react';
import ProductList from './ProductList';

interface NavItems {
    id: string;
    slug?: string;
    icon: string;
    nameBn: string;
}

export default function Home() {
    const [navs, setNavs] = useState<NavItems[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('chal');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    'https://api.abcz.workers.dev/api/bazardor/categories'
                );

                const data = await res.json();
                setNavs(data);
            } catch (error) {
                console.log('Category fetch error:', error);
            }
        };

        fetchCategories();
    }, []);

    const selectedItem = navs.find(
        (item) => (item.slug || item.id) === selectedCategory
    );

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Category navbar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto">

                    {navs.map((item) => {
                        const categorySlug = item.slug || item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedCategory(categorySlug)}
                                className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                                    selectedCategory === categorySlug
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.nameBn}</span>
                            </button>
                        );
                    })}

                </div>
            </div>

            {/* Selected category products */}
            <ProductList
                category={selectedCategory}
                categoryName={selectedItem?.nameBn || 'চাল'}
                categoryIcon={selectedItem?.icon || '🍚'}
            />

        </main>
    );
}
