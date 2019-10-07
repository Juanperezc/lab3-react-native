import React from 'react';
import {
  Button,
  Modal,
} from '@kitten/ui';
import { Spinner } from 'react-native-ui-kitten';
import { StyleSheet, Text } from 'react-native';
import { profile1 } from '@src/core/data/profile';

interface ModalLoadingState {
  visible: boolean;
}

export class ModalLoading extends React.Component<any, ModalLoadingState> {

  public state: ModalLoadingState = {
    visible: true,
  };

  private onToggleModal = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible });
  };

  private onBackdropPress = (): void => {
    if (this.props.allowBackdrop) {
      this.onToggleModal();
    }
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Modal
          style={styles.modal}
          visible={true}
          onBackdropPress={this.onBackdropPress}>
        <Spinner></Spinner>
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  backdropStyle: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
});
