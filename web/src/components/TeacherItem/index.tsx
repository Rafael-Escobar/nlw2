import React from 'react';
import './style.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/5831946?s=460&u=ff530a944803789c0ea612dc841d1aa46ec0b7c8&v=4" alt="" />
                <div>
                    <strong>Rafael Escobar</strong>
                    <span>Biologia</span>
                </div>
            </header>
            <p>
                bacharel em ciência da computação pela UNIOESTE. Atualmente exerço o papel de gerente de projetos júnior, coordenando equipe, levantamento de backlog, análise, integração e follow-up.
                Também atuo como desenvolvedor backend, onde trabalho com PHP, Node.js, base de dados MySQL e um pouco de Oracle. Em minha jornada já participei de pesquisa e desenvolvimento no laboratório
                CEASB de segurança de barragens, situado no parque tecnológico de Itaipu, neste projeto atuei como cientista e pesquisador no desenvolvimento de um protótipo de sistema de detecção de
                falhas utilizando estatística multivariada. Também realizei trabalho freelancer, como analista e desenvolvedor para IMS Desenvolvimento de software, em um projeto de diagnóstico social.
                    </p>
            <footer>
                <p>
                    Preço/hora
                            <strong>R$ 100,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>

            </footer>
        </article>
    );
}

export default TeacherItem;
