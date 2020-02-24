import styled from "styled-components";

export const Wrapper = styled.div`
  .transition-group {
    &_page-wrapper {
      position: relative;
    }

    &_animate {
      &-enter {
        animation: page-block-in 0.3s;
        /* &-active {
          animation: page-block-out 0.3s;
        } */
      }

      &-exit {
        animation: page-block-out 0.3s;
        /* &-active {
          animation: page-block-in 0.3s;
        } */
      }
    }
  }
`;
/**
 * 
.main-content.dynamic .main-content-container {
    animation: new-content .3s;
    animation-fill-mode: both;
    opacity: 0
}

.center-content.dynamic .feature {
    left: calc(100% - 250px - 64px);
    top: 64px
}

.main-content {
    position: relative
}

.main-content.dynamic .main-content-container {
    animation: new-content .3s;
    animation-fill-mode: both;
    opacity: 0
}

keyframes new-content {
    0% {
        opacity: 0;
        transform: translateY(300px)
    }

    100% {
        opacity: 1;
        transform: translateY(0)
    }
}

 */
