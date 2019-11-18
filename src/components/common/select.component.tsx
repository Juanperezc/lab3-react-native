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
  import { Text } from '@kitten/ui';
interface ComponentProps extends InputProps{
    id?: string | null,
    title: string,
    nombre?: string | null
    tStyle: any;
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
    const { style, themedStyle, title, ...restProps } = this.props;
    console.log(this.props)
    return (
      <Layout style={[themedStyle.container,style]}>
         <Text style={[themedStyle.label,style]}>
          {title}
        </Text>
        <Select
          data={this.data}
          selectedOption={this.state.selectedOption}
          icon={this.renderIcon}
        /*   style={[tStyle.container, styles]} */
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}
export const SelectComp = withStyles(SelectComponent, (theme: ThemeType) => ({
    container: {
        height: 90,
        padding: 0,
        width: 330
      },
      label:{
        fontWeight: 'normal',fontSize: 11,
        color: theme['text-hint-color']
      }
  }));
  
