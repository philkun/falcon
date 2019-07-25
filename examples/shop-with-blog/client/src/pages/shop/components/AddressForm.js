import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormField, CountrySelector, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import { Box, Button } from '@deity/falcon-ui';
import { I18n } from '@deity/falcon-i18n';

const AddressFormArea = {
  firstName: 'firstName',
  lastName: 'lastName',
  street1: 'street1',
  street2: 'street2',
  number: 'number',
  postCode: 'postCode',
  city: 'city',
  email: 'email',
  phone: 'phone',
  region: 'region',
  country: 'country',
  submit: 'submit'
};

const addressFormLayout = {
  addressFormLayout: {
    display: 'grid',
    gridGap: 'sm',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                      ],
      [AddressFormArea.email      ],
      [AddressFormArea.firstName  ],
      [AddressFormArea.lastName   ],
      [AddressFormArea.street1    ],
      [AddressFormArea.street2    ],
      [AddressFormArea.number     ],
      [AddressFormArea.postCode   ],
      [AddressFormArea.city       ],
      [AddressFormArea.phone      ],
      [AddressFormArea.country    ],
      [AddressFormArea.submit     ]
    ])
  }
};

const AddressForm = ({ countries = [], submitLabel = 'Save', id = '', autoCompleteSection }) => {
  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  return (
    <I18n>
      {t => (
        <Form id={id} defaultTheme={addressFormLayout}>
          <FormField name="email" type="email" label="Email" required gridArea={AddressFormArea.email} />
          <FormField
            name="firstname"
            label={t('addressForm.firstNameLabel')}
            required
            autoComplete={getAutoComplete('given-name')}
            gridArea={AddressFormArea.firstName}
          />
          <FormField
            name="lastname"
            label={t('addressForm.lastNameLabel')}
            required
            autoComplete={getAutoComplete('family-name')}
            gridArea={AddressFormArea.lastName}
          />
          <FormField
            name="street1"
            label={t('addressForm.street1Label')}
            required
            autoComplete={getAutoComplete('address-line1')}
            gridArea={AddressFormArea.street1}
          />
          <FormField
            name="street2"
            label={t('addressForm.street2Label')}
            autoComplete={getAutoComplete('address-line2')}
            gridArea={AddressFormArea.street2}
          />
          <FormField
            name="countryId"
            label={t('addressForm.countryLabel')}
            required
            autoComplete={getAutoComplete('country')}
            gridArea={AddressForm.country}
          >
            {({ form, field }) => (
              <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
            )}
          </FormField>
          <FormField
            name="postcode"
            label={t('addressForm.postcodeLabel')}
            required
            autoComplete={getAutoComplete('postal-code')}
            gridArea={AddressFormArea.postCode}
          />
          <FormField
            name="city"
            label={t('addressForm.cityLabel')}
            required
            autoComplete={getAutoComplete('address-level2')}
            gridArea={AddressFormArea.city}
          />
          <FormField
            name="telephone"
            label={t('addressForm.telephoneLabel')}
            required
            autoComplete={getAutoComplete('tel')}
            gridArea={AddressFormArea.phone}
          />
          <Box gridArea={AddressFormArea.submit}>
            <Button type="submit">{submitLabel}</Button>
          </Box>
        </Form>
      )}
    </I18n>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  )
};

export default AddressForm;
