/**
 * Created by desver_f on 06/03/17.
 */

import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    ActivityIndicator,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { observer } from 'mobx-react/native';
import { Button } from 'native-base';

const ButtonAnimated = Animated.createAnimatedComponent(Button);

const TextButton = observer(({ children, opacity }) => {
    return (
        <Animated.Text style={{
            color: '#FFF',
            fontSize: 12,
            opacity
        }}>
            { children }
        </Animated.Text>
    );
});

TextButton.propTypes = {
    children: React.PropTypes.string.isRequired,
    opacity: React.PropTypes.object.isRequired,
};

const CustomLayoutSpring = {
    duration: 400,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
};

@observer
export default class AnimatedButton extends Component {

    constructor(props) {
        super(props);

        this.buttonWidth = new Animated.Value(0);
        this.buttonScale = new Animated.Value(0);
        this.buttonColor = new Animated.Value(0);

        UIManager.setLayoutAnimationEnabledExperimental
        && UIManager.setLayoutAnimationEnabledExperimental(true);

        this.animationState = {
            default: 'default',
            animating: 'animating',
            error: 'error',
            success: 'success'
        };

        this.buttonContents = {
            default: (textOpacity) => (
                <TextButton opacity={textOpacity}>
                    {this.props.title}
                </TextButton>
            ),
            animating: () => (
                <ActivityIndicator
                    animating={this.state.animationState === this.animationState.animating}
                    color="#FFFFFF"
                />
            ),
            error: (textOpacity) => (
                <TextButton opacity={textOpacity}>
                    {this.props.errorTitle}
                </TextButton>
            ),
            success: () => <View />
        };

        this.state = {
            animationState: this.animationState.default,
        };

        this.animate = this.animate.bind(this);
    }

    animateSuccess() {
        this.buttonScale.setValue(0);

        this.props.isButtonAnimating(false);
        this.setState({ animationState: this.animationState.success }, () => {
            Animated.timing(
                this.buttonScale,
                {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.in(Easing.quad)
                }
            ).start(() => this.props.onAnimationEnd())
        });
    }

    animateError() {
        this.buttonColor.setValue(0);

        this.props.onAnimationEndError();
        this.setState({ animationState: this.animationState.error }, () => {
            Animated.parallel([
                Animated.timing(
                    this.buttonWidth,
                    {
                        toValue: 0,
                        duration: 600,
                        easing: Easing.in(Easing.quad)
                    }
                ),
                Animated.timing(
                    this.buttonColor,
                    {
                        toValue: 1,
                        duration: 3000,
                        easing: Easing.in(Easing.ease),
                    }
                )
            ]).start(() => {
                LayoutAnimation.configureNext(CustomLayoutSpring);
                this.setState({ animationState: this.animationState.default });
                this.props.isButtonAnimating(false);
            })
        });
    }

    onPressPromise() {
        return new Promise((resolve) => {
            try {
                this.props.onPress().then((res) => resolve(res));
            } catch (e) {
                resolve(false);
            }
        });
    }

    async animate() {

        if (!(await this.props.worthStartingAnimation())) {
            return Promise.resolve(false);
        }

        this.buttonWidth.setValue(0);
        this.buttonScale.setValue(0);

        this.setState({ animationState: this.animationState.animating }, () => {
            this.props.isButtonAnimating(true);
            Animated.timing(
                this.buttonWidth,
                {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.linear
                }
            ).start(() => {
                this.onPressPromise().then((success) => {
                    if (success) {
                        this.animateSuccess();
                    } else {
                        this.animateError();
                    }
                })
            })
        });
    }

    renderButtonContent() {
        const { animationState } = this.state;

        const textOpacity = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });

        return this.buttonContents[animationState](textOpacity);
    }

    render() {
        const { title, width } = this.props;

        const buttonWidth = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 40],
        });

        const buttonRadius = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 50],
        });

        const buttonScale = this.buttonScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 300],
        });

        const buttonColor = this.buttonColor.interpolate({
            inputRange: [0, 0.2, 1],
            outputRange: ['rgb(35, 52, 69)', 'rgb(244, 67, 54)', 'rgb(35, 52, 69)']
        });

        return (
            <ButtonAnimated
                style={{
                    backgroundColor: buttonColor,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    alignSelf: 'center',
                    width: buttonWidth,
                    borderRadius: buttonRadius,
                    transform: [{ scale: buttonScale }],
                    marginTop: 10,
                }}
                title={title}
                disabled={this.state.animationState !== this.animationState.default}
                onPress={this.animate}
            >
                { this.renderButtonContent() }
            </ButtonAnimated>
        );
    }
}

AnimatedButton.propTypes = {
    title: React.PropTypes.string.isRequired,
    errorTitle: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func,
    onAnimationEnd: React.PropTypes.func,
    onAnimationEndError: React.PropTypes.func,
    worthStartingAnimation: React.PropTypes.func,
    width: React.PropTypes.number,
    isButtonAnimating: React.PropTypes.func,
};