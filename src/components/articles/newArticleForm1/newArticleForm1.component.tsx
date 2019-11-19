import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { CheckBox } from '@kitten/ui';
import {
  textStyle,
  ValidationInput,
  SelectComponent,
} from '@src/components/common';
import {
  DOBValidator,
  EmailValidator,
  NameValidator,
  PhoneNumberValidator,
  PasswordValidator,
} from '@src/core/validators';
import { NewArticleForm1Data } from './type';
import { BemSelectModel } from '@src/core/model/bem_select.model';
//import {Picker} from 'react-native'
//import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
//import { Button } from '@kitten/ui';


interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  backgroundImage: string;
  category_select: Array<BemSelectModel>;
  onDataChange: (value: NewArticleForm1Data | undefined) => void;
/*   onCountrySelected: (value: NewArticleForm1Data | undefined) => void; */
}

export type NewArticleForm1Props = ThemedComponentProps & ViewProps & ComponentProps;

interface Pais {
  value: string;
  label: string
}
interface State {
  title: string | undefined;
  body: string | undefined;
 /*  photo : string | undefined; */
  category: string | undefined;
 
}

class NewArticleForm1Component extends React.Component<NewArticleForm1Props, State> {
/*   public paises: Array<Pais> = pais */;

  //seeders paises

  public state: State = {
    title: undefined,
    body: undefined,
   /*  photo: undefined, */
    category: undefined,
 
  };

  public componentDidUpdate(prevProps: NewArticleForm1Props, prevState: State) {
   /*  console.log('update') */
  /*   this.setState({
      photo: this.props.backgroundImage
    }) */
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onTitleInputTextChange = (title: string) => {
    this.setState({ title });
  };



  private onBodyInputTextChange = (body: string) => {
   this.setState({ body }); 
  };

  /* private onTermsAcceptChange = (termsAccepted: boolean) => {
    this.setState({ termsAccepted });
  }; */

  private onSelectedOption = (data : any) => {
    console.log('on selected', data);
    this.setState({
      category: data.text
    })
   /*  this.setState({ country }); */
  };


  private isValid = (value: NewArticleForm1Data): boolean => {
    const { title,body, category} = value;

    return title !== undefined
      && body != undefined
/*       && photo !== undefined */
      && category !== undefined
    };
  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    /* telefono pais ciudad username */
    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <ValidationInput
          style={[themedStyle.input, themedStyle.firstNameInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='Mi publicacion'
          label='Titulo'
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onTitleInputTextChange}
        />
        <ValidationInput
          style={[themedStyle.textarea, themedStyle.usernameInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vivamus lacinia elit sed purus gravida posuere. Morbi finibus lorem sed 
          vulputate interdum. In vestibulum ac erat nec ullamcorper. Quisque convallis 
          ut magna imperdiet sollicitudin. Ut mollis nisi ut euismod mollis. Aenean posuere
          nulla ac malesuada hendrerit.'
          label='Cuerpo'
          multiline={true}
          maxLength={500}
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onBodyInputTextChange}
        />
        {/* Categoria */}
        <SelectComponent
        data={this.props.category_select}
        style={themedStyle.input}
        themedStyle={themedStyle}
        title="Categoría"
        disabled={false}
        OnSelected={this.onSelectedOption}
        />
      </View>
    );
  }
}

export const NewArticleForm1 = withStyles(NewArticleForm1Component, (theme: ThemeType) => ({
  container: {},
  input: {
    marginTop: 16,
  },
  textarea: {
    maxHeight: 200,
    marginTop: 16,
  },
  firstNameInput: {
    marginTop: 0,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    color: theme['text-hint-color'],
    ...textStyle.paragraph,
  },
}));
