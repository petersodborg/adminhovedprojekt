'use strict';

(function(){
//operator controller specifikation
describe('OperatorsController', function(){
//initialiser variabler
var OperatorsController,
scope,
$httpBackend,
$stateParams,
$location;
//$resource service argumenterer for response object med metoder for at update og delete resourcen.
//Hvis vi vil bruge standard toEqual matcher, vores test vil fejle fordi test værdierne ikke vil passe
//responsen nøjagtigt. For at løse dette problem, definerer et nyt toEqualData jasmine matcher.
//Når toEqualData matcher sammenligner 2 objecter, så tager det kun object properties indtil account og ignorerer metoder.
//
    beforeEach(function() {
      jasmine.addMatchers({
        toEqualData: function(util, customEqualityTesters) {
          return {
            compare: function(actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });
// loading main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

//Injector ignorerer forreste og bageste underscores her(i.e. _$httpbackend_).
//Dette tillader os at injecte en service, men derefter vedhæfter det til en variabel
//med det samme navn som servicen
    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
      // New global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;

      // Initialize Operators controller.
      OperatorsController = $controller('OperatorsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one operator object fetched from XHR', inject(function(Operators) {
      // Create sample operator using the Operators service
      var sampleOperator = new Operators({
        operatorNavn: 'testoperator',
        aktiv: 'nej',
        innaktiv: 'ja',
        addresse: 'testaddresse',
        postnr: '2200',
        city: 'testcity',
        PO: 'testPO',
        land: 'testland',
        telefon: '22112211',
        email: 'test@test.com',
        web: 'www.test.com',
        fakturerinsKat: 'testfaktura',
        pakke: 'mellem',
        pakkeExpiry: '11/11/2016',
        budgetMax: '1000',
        priotet:'stor',
        microSiteID: '1',
        beskrivelse: 'testbeskrivelse',
        engelskBeskrivelse: 'testinenglish',
        logo: 'none',
        andetBillede: 'otherpicturetest',
        landeNavn: 'testland'

      });

      // Sample operators array der inkluderer en ny operator
      var sampleOperators = [sampleOperator];

      // Set GET response
      $httpBackend.expectGET('operators').respond(sampleOperators);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.operators).toEqualData(sampleOperators);
    }));

    it('$scope.findOne() should create an array with one operator object fetched from XHR using a operatorId URL parameter', inject(function(Operators) {
      // Definer et sample operator object
      var sampleOperator = new Operators({
        operatorNavn: 'testoperator',
        aktiv: 'nej',
        innaktiv: 'ja',
        addresse: 'testaddresse',
        postnr: '2200',
        city: 'testcity',
        PO: 'testPO',
        land: 'testland',
        telefon: '22112211',
        email: 'test@test.com',
        web: 'www.test.com',
        fakturerinsKat: 'testfaktura',
        pakke: 'mellem',
        pakkeExpiry: '11/11/2016',
        budgetMax: '1000',
        priotet:'stor',
        microSiteID: '1',
        beskrivelse: 'testbeskrivelse',
        engelskBeskrivelse: 'testinenglish',
        logo: 'none',
        andetBillede: 'otherpicturetest',
        landeNavn: 'testland'
      });

      // URL parameter
      $stateParams.operatorId = '525a8422f6d0f87f0e407a33';

      // Sæt GET response
      $httpBackend.expectGET(/operators\/([0-9a-fA-F]{24})$/).respond(sampleOperator);

      // Kør controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.operator).toEqualData(sampleOperator);
    }));

    it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Operators) {
      // Lav et sample operator object
      var sampleOperatorPostData = new Operators({
        operatorNavn: 'testoperator',
        aktiv: 'nej',
        innaktiv: 'ja',
        addresse: 'testaddresse',
        postnr: '2200',
        city: 'testcity',
        PO: 'testPO',
        land: 'testland',
        telefon: '22112211',
        email: 'test@test.com',
        web: 'www.test.com',
        fakturerinsKat: 'testfaktura',
        pakke: 'mellem',
        pakkeExpiry: '11/11/2016',
        budgetMax: '1000',
        priotet:'stor',
        microSiteID: '1',
        beskrivelse: 'testbeskrivelse',
        engelskBeskrivelse: 'testinenglish',
        logo: 'none',
        andetBillede: 'otherpicturetest',
        landeNavn: 'testland'
      });

      // Lav et sample operator response
      var sampleOperatorResponse = new Operators({
        _id: '525cf20451979dea2c000001',
        operatorNavn: 'testoperator',
        aktiv: 'nej',
        innaktiv: 'ja',
        addresse: 'testaddresse',
        postnr: '2200',
        city: 'testcity',
        PO: 'testPO',
        land: 'testland',
        telefon: '22112211',
        email: 'test@test.com',
        web: 'www.test.com',
        fakturerinsKat: 'testfaktura',
        pakke: 'mellem',
        pakkeExpiry: '11/11/2016',
        budgetMax: '1000',
        priotet:'stor',
        microSiteID: '1',
        beskrivelse: 'testbeskrivelse',
        engelskBeskrivelse: 'testinenglish',
        logo: 'none',
        andetBillede: 'otherpicturetest',
        landeNavn: 'testland'
      });

      // Fixture mock form input værdier

        scope.operatorNavn = 'testoperator',
        scope.aktiv = 'nej',
        scope.innaktiv = 'ja',
        scope.addresse = 'testaddresse',
        scope.postnr = '2200',
        scope.city = 'testcity',
        scope.PO = 'testPO',
        scope.land = 'testland',
        scope.telefon = '22112211',
        scope.email = 'test@test.com',
        scope.web = 'www.test.com',
        scope.fakturerinsKat = 'testfaktura',
        scope.pakke = 'mellem',
        scope.pakkeExpiry = '11/11/2016',
        scope.budgetMax = '1000',
        scope.priotet ='stor',
        scope.microSiteID = '1',
        scope.beskrivelse = 'testbeskrivelse',
        scope.engelskBeskrivelse = 'testinenglish',
        scope.logo = 'none',
        scope.andetBillede = 'otherpicturetest',
        scope.landeNavn = 'testland'


      // Sæt POST response
      $httpBackend.expectPOST('operators', sampleOperatorPostData).respond(sampleOperatorResponse);

      // køt controller functionality
      scope.create();
      $httpBackend.flush();

      // Test form inputs are reset
      expect(scope.operatorNavn).toEqual('');
      expect(scope.aktiv).toEqual('');
      expect(scope.innaktiv).toEqual('');
      expect(scope.addresse).toEqual('');
      expect(scope.postnr).toEqual('');
      expect(scope.city).toEqual('');
      expect(scope.PO).toEqual('');
      expect(scope.land).toEqual('');
      expect(scope.telefon).toEqual('');
      expect(scope.email).toEqual('');
      expect(scope.web).toEqual('');
      expect(scope.fakturerinsKat).toEqual('');
      expect(scope.pakke).toEqual('');
      expect(scope.pakkeExpiry).toEqual('');
      expect(scope.budgetMax).toEqual('');
      expect(scope.priotet).toEqual('');
      expect(scope.microSiteID).toEqual('');
      expect(scope.beskrivelse).toEqual('');
      expect(scope.engelskBeskrivelse).toEqual('');
      expect(scope.logo).toEqual('');
      expect(scope.andetBillede).toEqual('');
      expect(scope.landeNavn).toEqual('');

      // Test URL redirection efter the operator er skabt
      expect($location.path()).toBe('/operators/' + sampleOperatorResponse._id);
    }));

    it('$scope.update() should update a valid article', inject(function(Operators) {
      // Definer et sample operator put data
      var sampleOperatorPutData = new Operators({
        _id: '525cf20451979dea2c000001',
        _id: '525cf20451979dea2c000001',
        operatorNavn: 'test operatør',
        aktiv: 'nej',
        innaktiv: 'ja',
        addresse: 'testaddresse',
        postnr: '2200',
        city: 'testcity',
        PO: 'testPO',
        land: 'testland',
        telefon: '22112211',
        email: 'test@test.com',
        web: 'www.test.com',
        fakturerinsKat: 'testfaktura',
        pakke: 'mellem',
        pakkeExpiry: '11/11/2016',
        budgetMax: '1000',
        priotet:'stor',
        microSiteID: '1',
        beskrivelse: 'testbeskrivelse',
        engelskBeskrivelse: 'testinenglish',
        logo: 'none',
        andetBillede: 'otherpicturetest',
        landeNavn: 'testland'
      });

      // Mock operator i scope
      scope.operator = sampleOperatorPutData;

      // Sæt PUT response
      $httpBackend.expectPUT(/operators\/([0-9a-fA-F]{24})$/).respond();

      // Kør controller functionality
      scope.update();
      $httpBackend.flush();

      // Test URL location til nyt object
      expect($location.path()).toBe('/operators/' + sampleOperatorPutData._id);
    }));

    it('$scope.remove() should send a DELETE request with a valid operatorId and remove the operator from the scope', inject(function(Operators) {
      // Lav ny operator object
      var sampleOperator = new Operators({
        _id: '525a8422f6d0f87f0e407a33'
      });

      // Lav ny operators array og inkluderer operator
      scope.operators = [sampleOperator];

      // Sæt forventet DELETE response
      $httpBackend.expectDELETE(/operators\/([0-9a-fA-F]{24})$/).respond(204);

      // Kør controller functionality
      scope.remove(sampleOperator);
      $httpBackend.flush();

      // Test array Efter succesfuld delete
      expect(scope.operators.length).toBe(0);
    }));
  });
}());

