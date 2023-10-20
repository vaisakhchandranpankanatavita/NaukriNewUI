import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native';
import {Block, Button, Input, Image, Switch, Modal, Text} from '../components/';
import {Countries} from './Countries';
import {States} from './States';
import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {IRegistrationValidation, IRegistration, isAndroid} from './Register';

export const Register = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const [internationalLicenceIfAny, setInternationalLicenceIfAny] =
    useState(true);
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const [countries, setCountries] = useState('');
  const [licenceCountry, setLicenceCountry] = useState('');
  const [state, setState] = useState('');
  const [additionalQualifications, setAdditionalQualifications] = useState('');
  const [nursingCouncil, setNursingCouncil] = useState('');
  const {assets, colors, gradients, sizes} = useTheme();
  const [showModal, setModal] = useState({
    country: false,
    state: false,
    council: false,
    licenceCountry: false,
    additionalQualifications: false,
  });
  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(() => {
    /** send/save registratin data */
    console.log('te');
    navigation.navigate('Home');
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{padding: sizes.height * 0.03}}>
          <Text h4 center white marginBottom={sizes.md}>
            {t('register.title')}
          </Text>
        </Block>
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text p semibold center marginBottom={10}>
                {t('register.subtitle')}
              </Text>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Button
                  flex={1}
                  row
                  gradient={gradients.dark}
                  onPress={() =>
                    setModal((prevModal) => ({
                      ...prevModal,
                      country: true,
                    }))
                  }>
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingHorizontal={sizes.sm}>
                    <Text
                      white
                      bold
                      transform="uppercase"
                      marginRight={sizes.sm}>
                      {countries ? countries : ' Choose Country'}
                    </Text>
                    <Image
                      source={assets.arrow}
                      color={colors.white}
                      transform={[{rotate: '90deg'}]}
                    />
                  </Block>
                </Button>
                {countries === 'India' && (
                  <Button
                    flex={1}
                    row
                    style={{marginTop: 5}}
                    gradient={gradients.dark}
                    onPress={() =>
                      setModal((prevModal) => ({
                        ...prevModal,
                        state: true,
                      }))
                    }>
                    <Block
                      row
                      align="center"
                      justify="space-between"
                      paddingHorizontal={sizes.sm}>
                      <Text
                        white
                        bold
                        transform="uppercase"
                        marginRight={sizes.sm}>
                        {state ? state : ' Choose State'}
                      </Text>
                      <Image
                        source={assets.arrow}
                        color={colors.white}
                        transform={[{rotate: '90deg'}]}
                      />
                    </Block>
                  </Button>
                )}
                <Button
                  flex={1}
                  row
                  gradient={gradients.dark}
                  style={{marginTop: 10}}
                  onPress={() =>
                    setModal((prevModal) => ({
                      ...prevModal,
                      council: true,
                    }))
                  }>
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingHorizontal={sizes.sm}>
                    <Text
                      white
                      bold
                      transform="uppercase"
                      marginRight={sizes.sm}>
                      {nursingCouncil
                        ? nursingCouncil
                        : 'Registered Nursing Council'}
                    </Text>
                    <Image
                      source={assets.arrow}
                      color={colors.white}
                      transform={[{rotate: '90deg'}]}
                    />
                  </Block>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  marginTop={10}
                  label={'Registration Number'}
                  placeholder={'Registration Number'}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({name: value})}
                />
                <Block row flex={0} align="center" justify="space-between">
                  <Text>
                    International Licence if any{' '}
                    {internationalLicenceIfAny ? '' : ''}
                  </Text>
                  <Switch
                    checked={internationalLicenceIfAny}
                    onPress={(checked) => setInternationalLicenceIfAny(checked)}
                  />
                </Block>
                {internationalLicenceIfAny && (
                  <Button
                    flex={1}
                    row
                    marginTop={10}
                    gradient={gradients.dark}
                    onPress={() =>
                      setModal((prevModal) => ({
                        ...prevModal,
                        country: true,
                      }))
                    }>
                    <Block
                      row
                      align="center"
                      justify="space-between"
                      paddingHorizontal={sizes.sm}>
                      <Text
                        white
                        bold
                        transform="uppercase"
                        marginRight={sizes.sm}>
                        {countries ? countries : ' Choose Country'}
                      </Text>
                      <Image
                        source={assets.arrow}
                        color={colors.white}
                        transform={[{rotate: '90deg'}]}
                      />
                    </Block>
                  </Button>
                )}
                <Button
                  flex={1}
                  row
                  marginTop={10}
                  gradient={gradients.dark}
                  onPress={() =>
                    setModal((prevModal) => ({
                      ...prevModal,
                      additionalQualifications: true,
                    }))
                  }>
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingHorizontal={sizes.sm}>
                    <Text
                      white
                      bold
                      transform="uppercase"
                      marginRight={sizes.sm}>
                      {additionalQualifications
                        ? additionalQualifications
                        : 'Additional Qualifications'}
                    </Text>
                    <Image
                      source={assets.arrow}
                      color={colors.white}
                      transform={[{rotate: '90deg'}]}
                    />
                  </Block>
                </Button>
              </Block>
              <Modal
                visible={showModal.additionalQualifications}
                onRequestClose={() =>
                  setModal((prevModal) => ({
                    ...prevModal,
                    additionalQualifications: false,
                  }))
                }>
                <FlatList
                  keyExtractor={(item) => item.name}
                  data={['Fresher', 'Experienced']}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setAdditionalQualifications(item);
                        setModal((prevModal) => ({
                          ...prevModal,
                          additionalQualifications: false,
                        }));
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>
              <Modal
                visible={showModal.country}
                onRequestClose={() =>
                  setModal((prevModal) => ({
                    ...prevModal,
                    country: false,
                  }))
                }>
                <FlatList
                  keyExtractor={(item) => item.name}
                  data={Countries}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setCountries(item?.name);
                        setModal((prevModal) => ({
                          ...prevModal,
                          country: false,
                        }));
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item?.name}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>
              <Modal
                visible={showModal.licenceCountry}
                onRequestClose={() =>
                  setModal((prevModal) => ({
                    ...prevModal,
                    licenceCountry: false,
                  }))
                }>
                <FlatList
                  keyExtractor={(item) => item.name}
                  data={Countries}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setLicenceCountry(item?.name);
                        setModal((prevModal) => ({
                          ...prevModal,
                          country: false,
                        }));
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item?.name}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>
              <Modal
                visible={showModal?.state}
                onRequestClose={() =>
                  setModal((prevModal) => ({
                    ...prevModal,
                    state: false,
                  }))
                }>
                <FlatList
                  keyExtractor={(item) => item.code}
                  data={States}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setState(item?.name);
                        setModal((prevModal) => ({
                          ...prevModal,
                          state: false,
                        }));
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item?.name}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>
              <Modal
                visible={showModal?.council}
                onRequestClose={() =>
                  setModal((prevModal) => ({
                    ...prevModal,
                    council: false,
                  }))
                }>
                <FlatList
                  keyExtractor={(item) => item}
                  data={['Nursing Council', 'Council 1']}
                  renderItem={({item}) => (
                    <Button
                      marginBottom={sizes.sm}
                      onPress={() => {
                        setNursingCouncil(item);
                        setModal((prevModal) => ({
                          ...prevModal,
                          council: false,
                        }));
                      }}>
                      <Text p white semibold transform="uppercase">
                        {item}
                      </Text>
                    </Button>
                  )}
                />
              </Modal>
              {/* checkbox terms */}
              {/* <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
              <Checkbox
                marginRight={sizes.sm}
                checked={registration?.agreed}
                onPress={(value) => handleChange({agreed: value})}
              />
              <Text paddingRight={sizes.s}>
                {t('common.agree')}
                <Text
                  semibold
                  onPress={() => {
                    Linking.openURL('https://www.creative-tim.com/terms');
                  }}>
                  {t('common.terms')}
                </Text>
              </Text>
            </Block> */}
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Pro')}>
                <Text bold primary transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
