import styled from "styled-components";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function NotFound() {
  useTitle("Page Not Found");

  return (
    <Wrapper>
      <Card>
        <div className="antenna">
          <div className="antenna_line"></div>
          <div className="antenna_line"></div>
        </div>

        <div className="tv">
          <div className="screen">
            <div className="screen_text">404</div>
          </div>

          <div className="buttons">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="bottom">
          <div></div>
          <div></div>
        </div>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link to="/" className="home_btn">
          Back to Home
        </Link>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  background: #eef2f6;
`;

const Card = styled.div`
  width: 100%;
  max-width: 430px;
  text-align: center;
  position: relative;

  .antenna {
    width: 100px;
    height: 55px;
    margin: 0 auto -5px;
    position: relative;
  }

  .antenna_line {
    width: 5px;
    height: 65px;
    background: #334155;
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: 5px;
    transform-origin: bottom;
  }

  .antenna_line:first-child {
    transform: rotate(-35deg);
  }

  .antenna_line:last-child {
    transform: rotate(35deg);
  }

  .tv {
    position: relative;
    background: #2563eb;
    border-radius: 28px;
    padding: 25px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
  }

  .screen {
    height: 220px;
    background: #0f172a;
    border-radius: 18px;
    border: 10px solid #1e3a8a;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .screen_text {
    font-size: 90px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 5px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 18px;
    justify-content: flex-end;
  }

  .buttons span {
    width: 13px;
    height: 13px;
    background: white;
    border-radius: 50%;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 45px;
  }

  .bottom div {
    width: 18px;
    height: 35px;
    background: #334155;
    border-radius: 0 0 8px 8px;
  }

  h2 {
    margin-top: 30px;
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
  }

  p {
    margin-top: 8px;
    color: #64748b;
    font-size: 15px;
  }

  .home_btn {
    display: inline-block;
    margin-top: 22px;
    padding: 12px 24px;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    transition: 0.2s;
  }

  .home_btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }

  @media (max-width: 500px) {
    .screen {
      height: 180px;
    }

    .screen_text {
      font-size: 70px;
    }

    h2 {
      font-size: 24px;
    }
  }
`;

export default NotFound;