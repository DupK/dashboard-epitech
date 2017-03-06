/**
 * Created by desver_f on 06/03/17.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Animated,
    Easing,
    ActivityIndicator,
    Dimensions,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { Button } from 'native-base';

const ButtonAnimated = Animated.createAnimatedComponent(Button);

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

export default class AnimatedButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animating: false,
            error: false,
        };

        this.buttonWidth = new Animated.Value(0);
        this.buttonScale = new Animated.Value(0);
        this.buttonColor = new Animated.Value(0);

        UIManager.setLayoutAnimationEnabledExperimental
        && UIManager.setLayoutAnimationEnabledExperimental(true);

        this.animate = this.animate.bind(this);
    }

    animateSuccess() {
        this.buttonScale.setValue(0);

        Animated.timing(
            this.buttonScale,
            {
                toValue: 1,
                duration: 600,
                easing: Easing.in(Easing.quad)
            }
        ).start(async () => await this.props.onAnimationEnd())
    }


    animateError() {
        this.buttonColor.setValue(0);

        this.props.onAnimationEndError();
        this.setState({ error: true }, () => {
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
                this.setState({ error: false, animating: false });
            })
        });
    }

    onPressPromise() {
        return new Promise((resolve, reject) => {
            try {
                this.props.onPress().then((res) => resolve(res));
            } catch (e) {
                reject(false);
            }
        });
    }

    async animate() {

        if (!(await this.props.worthStartingAnimation())) {
            return Promise.resolve(false);
        }

        this.buttonWidth.setValue(0);
        this.buttonScale.setValue(0);

        this.setState({ animating: true }, () => {
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
                    this.setState({ animating: false });
                })
            })
        });
    }

    renderButtonContent() {
        const { title, errorTitle } = this.props;

        const textOpacity = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });

        if (!this.state.animating) {
            return (
                <Animated.Text
                    style={{
                        color: '#FFF',
                        fontSize: 12,
                        opacity: textOpacity
                    }}>
                    {
                        !this.state.error
                            ? title
                            : errorTitle
                    }
                </Animated.Text>
            );
        }

        return (
            <ActivityIndicator
                animating={this.state.animating}
                color="#FFFFFF"
            />
        );
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
            inputRange: [0, 0.5, 1],
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
                disabled={this.state.animating}
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
};