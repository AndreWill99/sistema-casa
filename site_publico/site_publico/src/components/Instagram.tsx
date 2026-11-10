import { useEffect } from "react";

const PERFIL = "santabarbara.aconchego";
const POST_URL = "https://www.instagram.com/p/DLkgIRbulB9/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==";

declare global {
    interface Window {
        instgrm?: { Embeds: { process: () => void } };
    }
}

export default function Instagram() {
    useEffect(() => {
        // Script já carregado: só reprocessa o embed
        if (window.instgrm) {
            window.instgrm.Embeds.process();
            return;
        }

        // Evita adicionar o script duas vezes
        if (document.getElementById("instagram-embed-script")) return;

        const script = document.createElement("script");
        script.id = "instagram-embed-script";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => window.instgrm?.Embeds.process();
        document.body.appendChild(script);
    }, []);

    return (
        <section id="instagram" className="bg-creme">
            <div className="mx-auto max-w-3xl px-6 py-14 text-center">
                <h2 className="text-3xl font-bold text-vinho">Acompanhe nosso dia a dia</h2>
                <p className="mt-4 text-sm">
                    Veja as novidades e momentos da casa no nosso Instagram{" "}
                    <a
                        href={`https://www.instagram.com/${PERFIL}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-vinho underline underline-offset-2"
                    >
                        @{PERFIL}
                    </a>
                    .
                </p>

                <div className="mt-8 flex justify-center">
                    <blockquote
                        className="instagram-media mx-auto w-full min-w-[326px] max-w-[540px]"
                        data-instgrm-permalink={`${POST_URL}?utm_source=ig_embed&utm_campaign=loading`}
                        data-instgrm-version="14"
                        data-instgrm-captioned
                    >
                        <a href={POST_URL} target="_blank" rel="noreferrer">
                            Ver esse post no Instagram
                        </a>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}