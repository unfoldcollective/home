/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 19/01/2015
 * Time: 13:02
 */

module.exports = function () {

    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '/partials/<%= name %>/<%= name %>.html',
        scope: {},
        compile: function (element, attrs) {

            return {
                pre: function (scope, element, attrs, controller, transcludeFn) {

                },
                post: function (scope, element, attrs, controller, transcludeFn) {

                }
            }
        },
        controller: function ($scope) {

        }
    }

}