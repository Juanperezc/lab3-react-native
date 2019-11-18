import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Select,
  Icon,
  Layout,
  ThemedComponentProps,
  withStyles,
  ThemeType,
} from 'react-native-ui-kitten';
import {
    Input,
    InputProps,
  } from '@kitten/ui';

interface ComponentProps extends InputProps{
    id?: string | null,
    nombre?: string | null
}

export type SelectComponentProps = ThemedComponentProps & ComponentProps;

export class SelectComponent extends React.Component<SelectComponentProps> {

    data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOption: null,
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  renderIcon = (style, visible) => {
    const iconName = visible ? 'arrow-ios-upward' : 'arrow-ios-downward';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  public render(): React.ReactNode {
    console.log(this.props)
    const { style, themedStyle, ...restProps } = this.props;
    return (
      <Layout style={styles.container}>
        <Select
          data={this.data}
          selectedOption={this.state.selectedOption}
          icon={this.renderIcon}
          //style={[themedStyle.container, styles]}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}
export const SelectComp = withStyles(SelectComponent, (theme: ThemeType) => ({
    container: {},
  }));
  
const styles = StyleSheet.create({
  container: {
    height: 230,
    padding: 16,
  },
});