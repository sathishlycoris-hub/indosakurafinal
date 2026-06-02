import {
    Sparkles,
    Zap,
    BarChart,
    Brain,
    MessageSquare,
    Shield,
    Briefcase,
    Factory,
    Package,
    ShoppingCart,
    Laptop,
    Cpu,
    Database,
    Globe,
} from "lucide-react";

const ICONS = [
    Sparkles,
    Zap,
    BarChart,
    Brain,
    MessageSquare,
    Shield,
    Briefcase,
    Factory,
    Package,
    ShoppingCart,
    Laptop,
    Cpu,
    Database,
    Globe,
];


import { usePage } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import Solutionhead from "@/components/layout/Solutionhead";
import ContactCTA from "@/components/layout/Contact";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Solution {
    id: number;
    title: string;
    title_ja?: string;

    subtitle: string | null;
    subtitle_ja?: string | null;

    hero_description: string | null;
    hero_description_ja?: string | null;

    hero_image: string | null;
    link: string | null;

    features: any[];
    use_cases: any[];
    industries: any[];
    case_studies: any[];
}
AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 120,
    delay: 80,
});

export default function Show({ solution }: { solution: Solution }) {
    const { lang } = usePage<{ lang: "en" | "ja" }>().props;

    const getValue = (en?: string | null, ja?: string | null) => {
        return (lang === "ja" ? ja || en : en) || "";
    };
    const getIconByIndex = (index: number) => {
        return ICONS[index % ICONS.length];
    };
    return (
        <Layout>
            <div className="sticky top-16 lg:top-[101px] z-40 bg-white">
                <Solutionhead />
            </div>
            {/* HERO */}
            <section className="py-12 lg:py-20 bg-section-light">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-left">

                    <div>
                        <h1 className="text-4xl font-bold mb-3">
                            {getValue(solution.title, solution.title_ja)}
                        </h1>

                        {solution.subtitle && (
                            <p className="text-lg text-primary mb-4">
                                {getValue(solution.subtitle, solution.subtitle_ja)}
                            </p>
                        )}

                        <div
                            className="text-muted-foreground mb-8 leading-relaxed prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: getValue(
                                    solution.hero_description,
                                    solution.hero_description_ja
                                ),
                            }}
                        />

                        <Button
                            size="lg"
                            onClick={() => {
                                if (solution.link) {
                                    if (solution.link.startsWith("http")) {
                                        window.open(solution.link, "_blank");
                                    } else {
                                        window.location.href = solution.link;
                                    }
                                }
                            }}
                        >
                            {getValue("Learn More", "詳細を見る")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {solution.hero_image && (
                        <img
                            src={`/storage/${solution.hero_image}`}
                            className="w-full max-w-2xl rounded-2xl shadow border"
                        />
                    )}

                </div>
            </section>

            {/* FEATURES */}
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-2" data-aos="fade-up">
                        {getValue("Key Features of", "主な機能")}{" "}
                        {getValue(solution.title, solution.title_ja)}
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-12" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {solution.features.map((f, i) => {
                            const Icon = getIconByIndex(i);
                            return (

                                <div key={i} data-aos="fade-up"
                                    data-aos-delay={i * 80} className="bg-card border rounded-lg p-6">
                                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-primary">{getValue(f.title, f.title_ja)}</h3>
                                    <p className="text-muted-foreground">{getValue(f.subtitle, f.subtitle_ja)}</p>
                                    <div
                                        className="prose mt-2"
                                        dangerouslySetInnerHTML={{ __html: getValue(f.description, f.description_ja) ?? "" }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* USE CASES */}
            {/* USE CASES */}
            {solution.use_cases?.length > 0 && (
                <section className="py-16 bg-section-light">
                    <div className="container mx-auto px-4 lg:px-8" data-aos="fade-up">

                        {/* Header */}
                        <h2 className="text-2xl font-bold text-center mb-2">
                            {getValue("Use Cases", "活用事例")}
                        </h2>

                        {/* Underline */}
                        <div className="w-20 h-1 bg-primary mx-auto mb-4" />

                        {/* Intro text */}
                        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                            {getValue(
                                `${solution.title} is designed to address real-world business challenges across industries through practical, AI-driven use cases.`,
                                "実践的なAI活用事例を通じて、さまざまな業界の現実的なビジネス課題を解決します。"
                            )}
                        </p>

                        {/* Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 " data-aos="fade-up">
                            {solution.use_cases.map((u, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl shadow-sm border border-border p-6
                       hover:shadow-md transition"
                                >
                                    {/* Title */}
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {getValue(u.title, u.title_ja)}
                                    </h3>

                                    {/* Subtitle */}
                                    {u.subtitle && (
                                        <p className="text-sm text-primary mb-2">
                                            {getValue(u.subtitle, u.subtitle_ja)}
                                        </p>
                                    )}

                                    {/* Description (HTML) */}
                                    <div
                                        className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: getValue(u.description, u.description_ja),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            )}


            {/* INDUSTRIES */}
            {/* INDUSTRIES */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4" data-aos="fade-up">

                    {/* Heading */}
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-foreground">
                            {getValue("Industry We Serve", "対応業界")}
                        </h2>

                        <div className="w-16 h-1 bg-pink-500 mx-auto mt-3 mb-4 rounded-full" />

                        <p className="text-muted-foreground">
                            {getValue(
                                "Enterprise-grade AI workflows built for multiple industries",
                                "複数業界向けに構築されたエンタープライズAIワークフロー"
                            )}
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {solution.industries.map((ind, i) => {
                            const Icon = getIconByIndex(i + 10);

                            return (
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay={i * 90}
                                    key={i}
                                    className="relative bg-pink-50/40 border border-pink-100 rounded-2xl p-8 text-center hover:shadow-md transition"
                                >
                                    {/* Icon Circle */}
                                    <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center mx-auto mb-5">
                                        <Icon className="w-6 h-6 text-pink-600" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {getValue(ind.title, ind.title_ja)}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm text-muted-foreground">
                                        {getValue(ind.description, ind.description_ja)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>


            {/* CASE STUDIES */}
            <section className="py-16 bg-section-light">

                <div className="container mx-auto space-y-6">
                    <div className="section-divider mb-8" data-aos="fade-left">
                        <h2 className="text-2xl font-semibold">{getValue("Case Studies", "導入事例")}</h2>
                    </div>
                    {solution.case_studies.map((c, i) => (
                        <div data-aos="fade-right"
                            data-aos-delay={i * 90} key={i} className="bg-card border rounded-lg p-6">
                            <h3 className="font-semibold text-primary">{getValue(c.title, c.title_ja)}</h3>
                            <div
                                className="prose mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: getValue(c.summary, c.summary_ja),
                                }}
                            />
                            {c.result && (
                                <p className="text-primary mt-3">{getValue(c.result, c.result_ja)}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <ContactCTA />
        </Layout>
    );
}
