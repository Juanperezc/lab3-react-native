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
    InputProps,
  } from '@kitten/ui';
  import { Text } from '@kitten/ui';
  import {BemCountryModel} from 'src/core/model/bem_country.model'
  import {BemCityModel} from '@src/core/model/bem_city.model'
import { BemSelectModel } from '@src/core/model/bem_select.model';

interface ComponentProps extends InputProps{
    id?: string | null,
    title: string,
    nombre?: string | null,
    data: Array<BemSelectModel>
    //BemCountryModel[]
    themedStyle: any;
    disable?: boolean
    onChangeVisibility?: (value: boolean | undefined) => void;
    OnSelectedCountry?: (country : string | undefined) => void
}

export type SelectComponentProps = ThemedComponentProps & ComponentProps;

export class SelectComponent extends React.Component<SelectComponentProps> {
 
    data = [
    { text: "Option 1",id:"1" },
    { text: 'Option 2',id:"2" },
    { text: 'Option 3',id:"3" },
  ];

  state = {
    selectedOption: null,
    disable: false,
    
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
  };

  onSelectedCountry=(country) =>{
    this.setState({disable: false})
  };

    onChangeVisibility = () => {
      if (this.state.disable == true){
        this.setState({disable:false});
      }
  };

  renderIcon = (style, visible) => {
    const iconName = visible ? 'arrow-ios-upward' : 'arrow-ios-downward';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle,title, disabled,onChangeVisibility,OnSelectedCountry ,...restProps } = this.props;
    return (
      <Layout style={styles.container}>
         <Text style={styles.label}>
          {title}
        </Text>
        <Select
          data={this.props.data}
          selectedOption={this.state.selectedOption}
          icon={this.renderIcon}
          disabled = {disabled}
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
        fontSize: 11,
        color: theme['text-hint-color'],
      }
  }));
  
const styles = StyleSheet.create({
    container: {
        height: 90,
        padding: 5,
        width: 335
      },
      label:{
        fontFamily: 'opensans-bold',
        fontWeight: 'normal',
        color: "#8F9BB3",
      }
});