import React, { useState } from 'react';


import context from 'Services/context';


import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const SignInForm = props => {
  const { classes, auth, onSubmit } = props;


  const [formData, setFormData] = useState(() => ({
    username: auth.username,
    password: '',
    rememberMe: context.isRememberMe()
  }));

  const handleFieldChange = event => {
    event.persist();
    setFormData(formData => ({
      ...formData,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };


  const isSubmitEnabled = () => {
    const { username, password } = formData;

    return username && password &&
      username.length > 0 &&
      password.length > 0;
  };

  const isUsernameEmpty = function(username) {
    return '' === username;
  }(formData.username);


  return (
    <form className={classes.form} noValidate>

      <TextField
        id="username"
        label="Email or Username"
        name="username"
        onChange={ handleFieldChange }
        value={ formData.username }
        autoComplete="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus={ isUsernameEmpty }
      />

      <TextField
        id="password"
        label="Password"
        name="password"
        onChange={ handleFieldChange }
        value={ formData.password }
        autoComplete="current-password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus={ !isUsernameEmpty }
      />

      <FormControlLabel
        control={
          <Checkbox
            id="remember-me"
            name="rememberMe"
            onChange={ handleFieldChange }
            checked={ formData.rememberMe }
            value="remember"
            color="primary"
          />}
        label="Remember me"
      />

      <Button
        onClick={() => {
          if (isSubmitEnabled()) {
            context.setRememberMe(formData.rememberMe);
            onSubmit(formData);
          }
        }}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        SIGN IN
      </Button>

    </form>
  );
};


export default SignInForm;
