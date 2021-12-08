import { Button } from "./styled/Button.styled";
import { Container } from "./styled/Container.styled";
import { Flex } from "./styled/Flex.styled";
import { Image, Logo, Nav, StyledHeader } from "./styled/Header.styled";
import ImgHeader from '../assets/images/illustration-mockups.svg'
import ImgLogo from '../assets/images/logo.svg'


export const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src={ImgLogo} alt='' />
                    <Button>Try it free</Button>
                </Nav>
                <Flex>
                    <div>
                        <h1>Build The Community Your Fans Will Love</h1>
                        <p>Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion.</p>
                        <Button bg='#ff0099' color='#fff'>Get started for free</Button>
                    </div>
                    <Image src={ImgHeader} alt='' />
                </Flex>
            </Container>
        </StyledHeader>
    );
};

export default Header;