/**
 * DRA. INGRID MEDEIROS - PREMIUM LANDING PAGE JS LOGIC
 * Includes: Nav logic, dynamic tabs, animated FAQ accordion, interactive beauty quiz & custom WhatsApp generator.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. STICKY HEADER & SCROLL LOGIC
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE MENU NAVIGATION
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       3. SERVICES TABS SYSTEM
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Deactivate all buttons & contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
            });

            // Activate current
            btn.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. ANIMATED FAQ ACCORDION
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-title');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            const content = header.nextElementSibling;
            const isActive = parentItem.classList.contains('active');

            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                parentItem.classList.add('active');
                // Use scrollHeight to animate perfectly
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       5. INTERACTIVE BEAUTY QUIZ (WOW FEATURE)
       ========================================================================== */
    // Quiz Config & Data
    const quizData = {
        optionsStep2: {
            facial: [
                { value: "linhas", label: "Linhas & Rugas de Expressão", desc: "Testa, olhos (pés de galinha), entre as sobrancelhas." },
                { value: "labios", label: "Contorno, Hidratação ou Volume Labial", desc: "Lábios finos, murchos ou sem contorno definido." },
                { value: "flacidez", label: "Flacidez e Perda de Sustentação", desc: "Bochechas caídas, perda do contorno da mandíbula." },
                { value: "olheiras", label: "Olheiras profundas ou escuras", desc: "Olhar cansado, sulco lacrimal fundo." },
                { value: "manchas", label: "Manchas, Cravos e Textura Áspera", desc: "Poros dilatados, pele opaca ou acneica." }
            ],
            corporal: [
                { value: "gordura", label: "Gordura Localizada Resistente", desc: "Abdomen, flancos, culote, papada." },
                { value: "celulite", label: "Celulite & Aspecto Casca de Laranja", desc: "Ondulações nos glúteos e pernas." },
                { value: "flacidez_corp", label: "Flacidez de Pele Corporal", desc: "Braço 'do tchau', interno de coxa, flacidez pós-parto." }
            ],
            capilar: [
                { value: "queda", label: "Queda de Cabelo Acentuada", desc: "Fios caindo no banho, escova ou falhas visíveis." },
                { value: "fios_fracos", label: "Fios Fracos, Finos ou Sem Crescimento", desc: "Cabelo ralo e enfraquecido da raiz às pontas." }
            ],
            vasos: [
                { value: "vasinhos", label: "Vasinhos Aparentes nas Pernas", desc: "Microvasos roxos ou avermelhados (incomodo estético)." }
            ]
        },
        recommendations: {
            facial_linhas: {
                title: "Protocolo Renovação & Suavidade Facial",
                desc: "Uma combinação ultra-segura de Toxina Botulínica (Botox) para relaxar rugas dinâmicas e microagulhamento com drug delivery para renovar as camadas superficiais da derme, devolvendo o viço e o aspecto descansado natural."
            },
            facial_labios: {
                title: "Protocolo Lips Premium Ingrid Medeiros",
                desc: "Preenchimento Labial luxuoso e esculpido milimetricamente com ácido hialurônico premium. Focado na hidratação, definição de contorno e volumização sutil, totalmente proporcional à sua simetria facial."
            },
            facial_flacidez: {
                title: "Protocolo Colágeno & Sustentação Plus",
                desc: "Protocolo focado no estímulo profundo de colágeno através de Bioestimuladores injetáveis de altíssima qualidade (como Sculptra ou Radiesse) combinados a pontos estratégicos de preenchimento estrutural (Malar/Mento) com ácido hialurônico para um efeito lifting suave."
            },
            facial_olheiras: {
                title: "Protocolo Olhar Renovado & Luminoso",
                desc: "Preenchimento do sulco lacrimal com ácido hialurônico de baixíssima densidade específico para olheiras profundas, suavizando sombras sob os olhos e eliminando o aspecto de cansaço crônico."
            },
            facial_manchas: {
                title: "Protocolo Pele de Porcelana & Limpeza Profunda",
                desc: "Limpeza de pele profunda com extração cuidadosa e peeling químico leve associada ao microagulhamento de indução de colágeno, refinando poros e clareando gradualmente o tom cutâneo."
            },
            corporal_gordura: {
                title: "Protocolo LipoEnzimática & Drenagem Localizada",
                desc: "Mesoterapia corporal com infusão localizada de enzimas lipolíticas inovadoras que degradam as células de gordura, facilitando sua eliminação natural. Ideal para culotes, abdomen e papada."
            },
            corporal_celulite: {
                title: "Protocolo Celu-Smooth de Alta Performance",
                desc: "Tratamento de Mesoterapia focado na melhora da microcirculação, desintoxicação e combate à fibrose local. Elimina o aspecto ondulado, melhorando o tônus e a uniformidade da derme nas pernas e glúteos."
            },
            corporal_flacidez_corp: {
                title: "Protocolo Firmeza & Tônus Corporal",
                desc: "Mesoterapia corporal com um blend de ativos de alto padrão (DMAE, Silício Orgânico, Colágeno) para melhorar a firmeza, elasticidade e espessura da pele em áreas flácidas como braços, interno de coxas e abdomen."
            },
            capilar_queda: {
                title: "Protocolo Bulbo Active Capilar (Antiqueda)",
                desc: "Intradermoterapia capilar médica. Infusão profunda no couro cabeludo de fatores de crescimento, minerais e bloqueadores de queda capilar diretamente na raiz do folículo piloso, cessando a queda e ativando fios inativos."
            },
            capilar_fios_fracos: {
                title: "Protocolo Hair Fortify & Growth",
                desc: "Mesoterapia capilar focada na nutrição profunda e fortalecimento da haste. Estimula a vasodilatação capilar e repõe minerais essenciais para engrossar cabelos ralos e acelerar de forma saudável o crescimento."
            },
            vasos_vasinhos: {
                title: "Tratamento PEIM (Secagem de Vasinhos Estéticos)",
                desc: "Procedimento Estético Injetável para Microvasos. Utiliza microagulhas de alta precisão para injetar substância esclerosante de glicose hipertônica diretamente nos vasinhos aparentes, promovendo o seu fechamento e absorção gradual pelo organismo."
            }
        }
    };

    let currentStep = 1;
    const answers = {
        area: '',
        complaint: '',
        complaintLabel: '',
        name: ''
    };

    // Make functions globally accessible so inline onclick handlers work
    window.goToStep = (step) => {
        if (step === 2) {
            // Save selected area
            const selectedAreaInput = document.querySelector('input[name="area"]:checked');
            if (!selectedAreaInput) return;
            answers.area = selectedAreaInput.value;
            
            // Build options for step 2 dynamically
            const optionsContainer = document.getElementById('step2Options');
            const step2Title = document.getElementById('step2Title');
            
            optionsContainer.innerHTML = '';
            
            // Dynamic Title Based on selection
            const areaNames = {
                facial: "Facial",
                corporal: "Corporal",
                capilar: "Capilar",
                vasos: "de Microvasos"
            };
            step2Title.textContent = `Qual o principal incômodo na área ${areaNames[answers.area]}?`;

            const currentOptions = quizData.optionsStep2[answers.area];
            currentOptions.forEach((opt, idx) => {
                const checked = idx === 0 ? 'checked' : '';
                optionsContainer.innerHTML += `
                    <label class="quiz-option">
                        <input type="radio" name="complaint" value="${opt.value}" ${checked}>
                        <span class="option-icon">✓</span>
                        <span class="option-content">
                            <strong>${opt.label}</strong>
                            <small>${opt.desc}</small>
                        </span>
                    </label>
                `;
            });
        }
        
        if (step === 3) {
            // Save selected complaint
            const selectedComplaintInput = document.querySelector('input[name="complaint"]:checked');
            if (!selectedComplaintInput) return;
            answers.complaint = selectedComplaintInput.value;
            answers.complaintLabel = selectedComplaintInput.parentElement.querySelector('strong').textContent;
        }

        // Hide current step, show target step
        document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
        
        const targetStepEl = document.getElementById(`step${step}`);
        if (targetStepEl) {
            targetStepEl.classList.add('active');
        }
        
        currentStep = step;
        
        // Progress bar calculations
        const progressPercent = (step / 3) * 75; // 75% for steps, 100% for results
        document.getElementById('quizProgress').style.width = `${progressPercent}%`;
    };

    window.generateRecommendation = () => {
        const userNameInput = document.getElementById('userName');
        answers.name = userNameInput.value.trim() || 'Paciente';
        
        // Compute recommendation key
        let recKey = `${answers.area}_${answers.complaint}`;
        
        // Fallbacks if specific key is missing
        if (answers.area === 'capilar') recKey = answers.complaint === 'queda' ? 'capilar_queda' : 'capilar_fios_fracos';
        if (answers.area === 'vasos') recKey = 'vasos_vasinhos';
        
        // Get recommendation details
        const recommendation = quizData.recommendations[recKey] || quizData.recommendations['facial_linhas'];
        
        // Inject results into UI
        document.getElementById('userGreeting').innerHTML = `<strong>${answers.name}</strong>, com base nas suas queixas clínicas, montamos este direcionamento especial:`;
        document.getElementById('recTitle').textContent = recommendation.title;
        document.getElementById('recDesc').textContent = recommendation.desc;
        
        // WhatsApp API text encoding
        const dddAndPhone = "558896996471"; // Dra Ingrid Whatsapp
        const introArea = {
            facial: "Estética Facial",
            corporal: "Estética Corporal",
            capilar: "Estética Capilar",
            vasos: "Microvasos (PEIM)"
        };
        
        const textMessage = `Olá Dra. Ingrid! Realizei a Pré-Consulta digital no seu site e gostaria de agendar uma avaliação clínica presencial. Meus dados:\n\n- *Nome*: ${answers.name}\n- *Área clínica*: ${introArea[answers.area]}\n- *Incômodo principal*: ${answers.complaintLabel}\n- *Indicação sugerida*: ${recommendation.title}`;
        
        const encodedText = encodeURIComponent(textMessage);
        const whatsAppUrl = `https://wa.me/${dddAndPhone}?text=${encodedText}`;
        
        // Inject URL to button
        const whatsappBtn = document.getElementById('whatsAppQuizBtn');
        if (whatsappBtn) {
            whatsappBtn.href = whatsAppUrl;
        }
        
        // Show result step
        document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
        document.getElementById('stepResult').classList.add('active');
        
        // Fill progress to 100%
        document.getElementById('quizProgress').style.width = '100%';
    };

    window.restartQuiz = () => {
        // Clear forms
        document.getElementById('userName').value = '';
        const defaultRadio = document.querySelector('input[name="area"][value="facial"]');
        if (defaultRadio) defaultRadio.checked = true;
        
        // Go back to first step
        goToStep(1);
    };

});
