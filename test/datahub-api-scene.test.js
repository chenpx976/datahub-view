'use strict';

import assert from 'assert';

import {
  driver,
  BASE_URL,
  setCodeMirror,
} from './helper';

import {
  successScene,
  failScene,
} from './fixture/data';

describe('test/datahub-api-scene.test.js', () => {
  describe('project api scene testing', () => {
    before(() => {
      return driver
        .initWindow({
          width: 960,
          height: 720,
          deviceScaleFactor: 2,
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36 Language/zh-CN',
        });
    });

    afterEach(function () {
      return driver
        .sleep(1000)
        .coverage()
        .saveScreenshots(this);
    });

    after(() => {
      return driver
        // delete project
        .getUrl(`${BASE_URL}/dashboard`)
        .waitForElementByCss('[data-accessbilityid="dashboard-content-card-0"] .delete-icon')
        .click()
        .sleep(1500)
        .waitForElementByCss('.ant-popover-buttons .ant-btn-primary')
        .click()
        .sleep(1500)
        // quit
        .openReporter(false)
        .quit();
    });

    it('add project should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/dashboard`)
        .waitForElementByCss('[data-accessbilityid="dashboard-folder-add"]')
        .click()
        .elementByCss('#projectName')
        .click()
        .formatInput('datahubview')
        .sleep(1500)
        .elementByCss('#description')
        .click()
        .formatInput('DataHub Mock Data')
        .sleep(1500)
        .waitForElementByCss('button.ant-btn.ant-btn-primary')
        .click()
        .sleep(1500);
    });

    it('add api should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .waitForElementByCss('[data-accessbilityid="project-add-api-list-btn"]')
        .click()
        .elementByCss('#pathname')
        .click()
        .formatInput('init')
        .sleep(1500)
        .elementByCss('#description')
        .click()
        .formatInput('init api get')
        .sleep(1500)
        .waitForElementByCss('#method .ant-select-selection')
        .click()
        .waitForElementByCss('.ant-select-dropdown-menu-item:nth-child(2)')
        .click()
        .sleep(1500)
        .waitForElementByCss('.ant-modal-footer .ant-btn-primary')
        .click()
        .sleep(1500)
        .waitForElementByCss('[data-accessbilityid="project-add-api-list-0"] h3')
        .hasText('init')
        .sleep(1500);
    });

    it('add default scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .sleep(1500)

        // add default scene
        .waitForElementByCss('[data-accessbilityid="project-api-scene-add-btn"]')
        .click()
        .elementByCss('#sceneName')
        .click()
        .formatInput('default')
        .sleep(1500)
        .execute(setCodeMirror(successScene))
        .sleep(1500)
        .waitForElementByCss('.ant-modal-footer .ant-btn-primary')
        .click()
        .sleep(1500)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-0"] .common-list-item-name')
        .hasText('default')
        .sleep(1500);
    });

    it('add error scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .sleep(1500)

        // add default scene
        .waitForElementByCss('[data-accessbilityid="project-api-scene-add-btn"]')
        .click()
        .elementByCss('#sceneName')
        .click()
        .formatInput('error')
        .sleep(1500)
        .execute(setCodeMirror(failScene))
        .sleep(1500)
        .waitForElementByCss('.ant-modal-footer .ant-btn-primary')
        .click()
        .sleep(1500)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-1"] .common-list-item-name')
        .hasText('error')
        .sleep(1500);
    });

    it('switch default scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-0"] .common-list-item-name')
        .click()
        .sleep(1500)
        .getUrl(`${BASE_URL}/data/datahubview/init`)
        .waitForElementByCss('body')
        /* eslint-disable */
        .hasText(JSON.stringify(successScene));
        /* eslint-enable */
    });

    it('switch error scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-1"] .common-list-item-name')
        .click()
        .getUrl(`${BASE_URL}/data/datahubview/init`)
        .waitForElementByCss('body')
        /* eslint-disable */
        .hasText(JSON.stringify(failScene));
        /* eslint-enable */
    });

    it('delete error scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-1"] .anticon-delete')
        .click()
        .waitForElementByCss('.ant-popover-buttons .ant-btn-primary')
        .click()
        .sleep(1500)
        .hasElementByCss('[data-accessbilityid="project-api-scene-list-1"] .scene-name')
        .then(value => assert.equal(value, false));
    });

    it('delete default scene should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/project/datahubview`)
        .waitForElementByCss('[data-accessbilityid="project-api-scene-list-0"] .anticon-delete')
        .click()
        .sleep(1500)
        .waitForElementByCss('.ant-popover-buttons .ant-btn-primary')
        .click()
        .sleep(1500)
        .hasElementByCss('[data-accessbilityid="project-api-scene-list-0"] .anticon-delete')
        .then(value => assert.equal(value, false));
    });
  });
});
